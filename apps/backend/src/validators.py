"""
Security validators for the stateless backend.
Prevents SSRF, injection attacks, and input validation issues.
"""
import re
import ipaddress
from urllib.parse import urlparse
from typing import Optional

# Maximum allowed length for app_id
MAX_APP_ID_LENGTH = 64

# Allowed characters in app_id (alphanumeric, hyphens, underscores)
APP_ID_PATTERN = re.compile(r'^[a-zA-Z0-9_-]+$')

# Private/internal IP ranges to block for SSRF protection
BLOCKED_IP_RANGES = [
    ipaddress.ip_network('10.0.0.0/8'),
    ipaddress.ip_network('172.16.0.0/12'),
    ipaddress.ip_network('192.168.0.0/16'),
    ipaddress.ip_network('127.0.0.0/8'),
    ipaddress.ip_network('169.254.0.0/16'),  # AWS metadata
    ipaddress.ip_network('0.0.0.0/8'),
]

BLOCKED_HOSTNAMES = [
    'localhost',
    'metadata.google.internal',
    'metadata.internal',
]


def validate_app_id(app_id: Optional[str]) -> tuple[bool, str]:
    """
    Validate app_id header for security.
    Returns (is_valid, error_message)
    """
    if not app_id:
        return False, "Missing x-app-id header"
    
    if len(app_id) > MAX_APP_ID_LENGTH:
        return False, f"x-app-id exceeds maximum length of {MAX_APP_ID_LENGTH}"
    
    if not APP_ID_PATTERN.match(app_id):
        return False, "x-app-id contains invalid characters (only alphanumeric, hyphens, underscores allowed)"
    
    return True, ""


def validate_webhook_url(url: Optional[str]) -> tuple[bool, str]:
    """
    Validate webhook URL to prevent SSRF attacks.
    Returns (is_valid, error_message)
    """
    if not url:
        return True, ""  # Empty URL is allowed (no webhook)
    
    try:
        parsed = urlparse(url)
    except Exception:
        return False, "Invalid URL format"
    
    # Must be HTTPS in production (allow HTTP for localhost testing)
    if parsed.scheme not in ('https', 'http'):
        return False, "Webhook URL must use HTTPS"
    
    hostname = parsed.hostname
    if not hostname:
        return False, "Invalid hostname in webhook URL"
    
    # Block known internal hostnames
    hostname_lower = hostname.lower()
    for blocked in BLOCKED_HOSTNAMES:
        if hostname_lower == blocked or hostname_lower.endswith('.' + blocked):
            return False, f"Webhook URL cannot target internal hostname: {blocked}"
    
    # Try to resolve and check if IP is private
    try:
        # Check if hostname is an IP address directly
        ip = ipaddress.ip_address(hostname)
        for blocked_range in BLOCKED_IP_RANGES:
            if ip in blocked_range:
                return False, f"Webhook URL cannot target private/internal IP range"
    except ValueError:
        # Not an IP address, it's a hostname - that's fine
        pass
    
    # Block common cloud metadata endpoints
    if 'metadata' in hostname_lower or '169.254' in hostname:
        return False, "Webhook URL cannot target cloud metadata endpoints"
    
    return True, ""


def sanitize_log_string(value: str, max_length: int = 100) -> str:
    """
    Sanitize a string for safe logging.
    Removes newlines/carriage returns and truncates.
    """
    if not value:
        return ""
    
    # Remove control characters
    sanitized = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', value)
    
    # Truncate
    if len(sanitized) > max_length:
        sanitized = sanitized[:max_length] + '...'
    
    return sanitized
