import os

import resend
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")

if not RESEND_API_KEY:
    raise RuntimeError("RESEND_API_KEY is not configured.")

resend.api_key = RESEND_API_KEY


def send_password_reset_email(
    recipient_email: str,
    reset_link: str,
) -> None:
    resend.Emails.send(
        {
            "from": "ANVAYA <onboarding@resend.dev>",
            "to": [recipient_email],
            "subject": "ANVAYA — Password Recovery",
            "html": f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ANVAYA Password Recovery</title>
            </head>

            <body style="
                margin:0;
                padding:0;
                background:#020508;
                font-family:Arial,Helvetica,sans-serif;
                color:#ffffff;
            ">

                <div style="
                    max-width:600px;
                    margin:0 auto;
                    padding:50px 25px;
                ">

                    <div style="
                        border:1px solid #1c2930;
                        background:#071016;
                        border-radius:20px;
                        padding:45px 35px;
                    ">

                        <div style="
                            font-size:13px;
                            letter-spacing:5px;
                            color:#67e8f9;
                            font-weight:bold;
                            margin-bottom:35px;
                        ">
                            ANVAYA
                        </div>

                        <div style="
                            font-size:10px;
                            letter-spacing:3px;
                            color:#67e8f9;
                            margin-bottom:15px;
                            text-transform:uppercase;
                        ">
                            Security Protocol
                        </div>

                        <h1 style="
                            margin:0;
                            font-size:32px;
                            line-height:1.2;
                            font-weight:500;
                        ">
                            Reset your password
                        </h1>

                        <p style="
                            margin-top:20px;
                            color:#9aa6ad;
                            font-size:15px;
                            line-height:1.7;
                        ">
                            A password reset was requested for your
                            ANVAYA account.
                        </p>

                        <p style="
                            color:#9aa6ad;
                            font-size:15px;
                            line-height:1.7;
                        ">
                            Use the secure recovery channel below
                            to create a new password.
                        </p>

                        <div style="
                            margin:35px 0;
                        ">
                            <a
                                href="{reset_link}"
                                style="
                                    display:inline-block;
                                    padding:14px 24px;
                                    background:#67e8f9;
                                    color:#020508;
                                    text-decoration:none;
                                    border-radius:10px;
                                    font-size:14px;
                                    font-weight:bold;
                                "
                            >
                                Reset Password →
                            </a>
                        </div>

                        <div style="
                            border-top:1px solid #1c2930;
                            padding-top:25px;
                            margin-top:35px;
                        ">

                            <p style="
                                margin:0;
                                color:#68747b;
                                font-size:12px;
                                line-height:1.7;
                            ">
                                This recovery link expires in
                                <strong style="color:#9aa6ad;">
                                    30 minutes
                                </strong>
                                and can only be used once.
                            </p>

                            <p style="
                                margin-top:15px;
                                color:#68747b;
                                font-size:12px;
                                line-height:1.7;
                            ">
                                If you did not request a password
                                reset, you can safely ignore this email.
                            </p>

                        </div>

                    </div>

                    <div style="
                        text-align:center;
                        margin-top:25px;
                        color:#3c464c;
                        font-size:9px;
                        letter-spacing:3px;
                        text-transform:uppercase;
                    ">
                        ANVAYA • NORTH EASTERN REGION • INDIA
                    </div>

                </div>

            </body>
            </html>
            """,
        }
    )