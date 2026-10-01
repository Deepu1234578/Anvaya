import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

BREVO_SMTP_HOST = os.getenv("BREVO_SMTP_HOST")
BREVO_SMTP_PORT = int(os.getenv("BREVO_SMTP_PORT", "587"))
BREVO_SMTP_LOGIN = os.getenv("BREVO_SMTP_LOGIN")
BREVO_SMTP_PASSWORD = os.getenv("BREVO_SMTP_PASSWORD")
BREVO_SENDER_EMAIL = os.getenv("BREVO_SENDER_EMAIL")
BREVO_SENDER_NAME = os.getenv("BREVO_SENDER_NAME", "ANVAYA")


def send_password_reset_email(recipient_email: str, reset_link: str):
    if not all([
        BREVO_SMTP_HOST,
        BREVO_SMTP_LOGIN,
        BREVO_SMTP_PASSWORD,
        BREVO_SENDER_EMAIL,
    ]):
        raise RuntimeError("Brevo SMTP configuration is incomplete.")

    msg = EmailMessage()

    msg["Subject"] = "ANVAYA Password Reset"
    msg["From"] = f"{BREVO_SENDER_NAME} <{BREVO_SENDER_EMAIL}>"
    msg["To"] = recipient_email

    msg.set_content(
        f"""
ANVAYA Password Reset

You requested a password reset for your ANVAYA account.

Reset your password using this link:

{reset_link}

This link will expire shortly.

If you did not request this password reset, you can safely ignore this email.

— ANVAYA
"""
    )

    msg.add_alternative(
        f"""
<html>
<body>
    <h2>ANVAYA Password Reset</h2>

    <p>You requested a password reset for your ANVAYA account.</p>

    <p>Click the button below to reset your password:</p>

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

    <p>This link will expire shortly.</p>

    <p>
        If you did not request this password reset,
        you can safely ignore this email.
    </p>

    <p>— ANVAYA</p>
</body>
</html>
""",
        subtype="html",
    )

    with smtplib.SMTP(BREVO_SMTP_HOST, BREVO_SMTP_PORT) as server:
        server.starttls()
        server.login(BREVO_SMTP_LOGIN, BREVO_SMTP_PASSWORD)
        server.send_message(msg)

    print(f"Password reset email sent to {recipient_email}")