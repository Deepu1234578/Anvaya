import secrets

from google.auth.transport import requests
from google.oauth2 import id_token
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.services.email_service import send_password_reset_email



from app.api.deps import get_current_user, get_db, require_roles
from app.api.deps import get_current_user, get_db
from app.api.deps import get_db
from app.core.security.jwt import create_access_token
from app.core.security.password import hash_password, verify_password
from app.models.user import User
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
    GoogleLoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)

GOOGLE_CLIENT_ID = (
    "164529551573-000igbdb18ao9htrd32446jeum7l2j3s.apps.googleusercontent.com"
)

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: RegisterRequest,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    user = User(
        email=user_data.email,
        full_name=user_data.full_name,
        hashed_password=hash_password(user_data.password),
        role="CUSTOMER",
        is_active=True,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == login_data.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(
        login_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.post(
    "/google",
    response_model=TokenResponse,
)
def google_login(
    google_data: GoogleLoginRequest,
    db: Session = Depends(get_db),
):
    try:
        google_user = id_token.verify_oauth2_token(
            google_data.credential,
            requests.Request(),
            GOOGLE_CLIENT_ID,
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google credential",
        )

    email = google_user.get("email")
    full_name = google_user.get("name")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google account email not available",
        )

    if not google_user.get("email_verified"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Google email is not verified",
        )

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    # Create ANVAYA account if it doesn't exist
    if not user:
        user = User(
            email=email,
            full_name=full_name or email.split("@")[0],
            hashed_password=hash_password(
                secrets.token_urlsafe(32)
            ),
            role="CUSTOMER",
            is_active=True,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == data.email.lower())
        .first()
    )

    # Always return the same response whether the email exists or not.
    # This prevents account enumeration.
    if not user:
        return {
            "message": (
                "If an ANVAYA account exists for that email, "
                "you will receive password reset instructions."
            )
        }

    reset_token = secrets.token_urlsafe(32)

    user.password_reset_token = reset_token
    user.password_reset_expires = (
        datetime.now(timezone.utc) + timedelta(minutes=30)
    )

    db.commit()

    # Development mode:
    # Print the reset link in the backend terminal.
    reset_link = (
        f"http://localhost:5173/reset-password"
        f"?token={reset_token}"
    )

    send_password_reset_email(
        recipient_email=user.email,
        reset_link=reset_link,
    )

    return {
        "message": (
            "If an ANVAYA account exists for that email, "
            "you will receive password reset instructions."
        )
    }

@router.post("/reset-password")
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.password_reset_token == data.token)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired password reset link.",
        )

    if (
        not user.password_reset_expires
        or user.password_reset_expires < datetime.now(timezone.utc).replace(tzinfo=None)
    ):
        user.password_reset_token = None
        user.password_reset_expires = None
        db.commit()

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired password reset link.",
        )

    user.hashed_password = hash_password(data.new_password)

    # Invalidate the token immediately after successful use.
    user.password_reset_token = None
    user.password_reset_expires = None

    db.commit()

    return {
        "message": "Password reset successfully."
    }

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user

@router.get("/admin-test")
def admin_test(
    current_user: User = Depends(require_roles("ADMIN")),
):
    return {
        "message": "Admin access granted",
        "user_id": current_user.id,
        "role": current_user.role,
    }