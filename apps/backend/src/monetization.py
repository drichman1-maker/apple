import uuid
import secrets

class MonetizationService:
    def generate_affiliate_code(self, app_id: str) -> str:
        """
        Generates a stateless, session-based affiliate code.
        Format: APPID-RANDOM
        """
        # In a real system, we might sign this to verify origin or just log metrics
        suffix = secrets.token_hex(4).upper()
        return f"{app_id[:3].upper()}-{suffix}"

    def validate_receipt(self, receipt_data: str) -> bool:
        """
        Stub for StoreKit receipt validation.
        Real world: Send 'receipt_data' to Apple's verifyReceipt endpoint.
        """
        if not receipt_data:
            return False
        
        # Mock validation: assume standard base64 receipt string is valid for test
        print(f"Mock: Validating receipt {receipt_data[:10]}...")
        return True
