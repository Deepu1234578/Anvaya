import os
import requests
from dotenv import load_dotenv

load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_SENDER_EMAIL = os.getenv("BREVO_SENDER_EMAIL")
BREVO_SENDER_NAME = os.getenv("BREVO_SENDER_NAME", "ANVAYA")


def send_password_reset_email(recipient_email: str, reset_link: str):
    if not BREVO_API_KEY or not BREVO_SENDER_EMAIL:
        raise RuntimeError("Brevo API configuration is incomplete.")

    payload = {
        "sender": {
            "name": BREVO_SENDER_NAME,
            "email": BREVO_SENDER_EMAIL,
        },
        "to": [
            {
                "email": recipient_email,
            }
        ],
        "subject": "ANVAYA Password Reset",

        "textContent": f"""
ANVAYA Password Reset

You requested a password reset for your ANVAYA account.

Reset your password using this link:

{reset_link}

This link will expire shortly.

If you did not request this password reset, you can safely ignore this email.

— ANVAYA
""",

        "htmlContent": f"""
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">

    <h2>ANVAYA Password Reset</h2>

    <p>
        You requested a password reset for your ANVAYA account.
    </p>

    <p>
        Click the button below to reset your password:
    </p>

    <p>
        <a href="{reset_link}"
           style="
           display:inline-block;
           padding:12px 20px;
           background:#000;
           color:#fff;
           text-decoration:none;
           border-radius:8px;">
           Reset Password
        </a>
    </p>

    <p>
        This link will expire shortly.
    </p>

    <p>
        If you did not request this password reset,
        you can safely ignore this email.
    </p>

    <p>— ANVAYA</p>

</body>
</html>
"""
    }

    response = requests.post(
        "https://api.brevo.com/v3/smtp/email",
        headers={
            "accept": "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json",
        },
        json=payload,
        timeout=20,
    )

    response.raise_for_status()

    result = response.json()

    print(
        f"Brevo email sent successfully: "
        f"{result.get('messageId')}"
    )

    return result