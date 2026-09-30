import os
import resend
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")

if not RESEND_API_KEY:
    raise RuntimeError("RESEND_API_KEY is not configured.")

resend.api_key = RESEND_API_KEY


def send_password_reset_email(recipient_email: str, reset_link: str):

    result = resend.Emails.send({
        "from": "ANVAYA <onboarding@resend.dev>",
        "to": [recipient_email],
        "subject": "ANVAYA Password Reset",
        "html": f"""
        <html>
        <body>
            <h2>ANVAYA Password Reset</h2>

            <p>You requested a password reset for your ANVAYA account.</p>

            <p>Click below to reset your password:</p>

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

            <p>If you did not request this, you can safely ignore this email.</p>
        </body>
        </html>
        """
    })

    print("========== RESEND RESPONSE ==========")
    print(result)
    print("=====================================")

    return result