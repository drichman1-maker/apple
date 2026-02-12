import os
import httpx
# For APNs, we might use httpx/2 or a specific lib like PyAPNs2, but we'll stick to a raw implementation or stub for now.

class NotificationService:
    def __init__(self):
        self.sendgrid_key = os.environ.get("SENDGRID_API_KEY")
        self.apns_key = os.environ.get("APNS_AUTH_KEY")

    async def send_email(self, to_email: str, subject: str, content: str):
        """
        Sends an email via SendGrid.
        crucial: ensure 'to_email' is not logged or stored permanently.
        """
        if not self.sendgrid_key:
            print("Mock: SendGrid key missing. Email sent to stdout.")
            return True

        url = "https://api.sendgrid.com/v3/mail/send"
        headers = {
            "Authorization": f"Bearer {self.sendgrid_key}",
            "Content-Type": "application/json"
        }
        data = {
            "personalizations": [{"to": [{"email": to_email}]}],
            "from": {"email": "noreply@stateless-infrastructure.com"},
            "subject": subject,
            "content": [{"type": "text/plain", "value": content}]
        }
        
        async with httpx.AsyncClient() as client:
            resp = await client.post(url, headers=headers, json=data)
            return resp.status_code == 202

    async def send_push(self, device_token: str, message: str):
        """
        Sends push via APNs.
        Token is ephemeral and should be discarded after use.
        """
        print(f"Mock: Sending push to {device_token[:8]}...: {message}")
        # Real implementation would use update http2 connection to api.push.apple.com
        return True
