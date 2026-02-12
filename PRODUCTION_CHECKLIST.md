# Production Deployment Checklist

## CRITICAL: Redis Configuration Required

The rate limiting system uses in-memory storage by default, which **WILL NOT WORK** in multi-instance deployments.

### Before deploying to production:

1. **Provision Redis instance** (Render, AWS ElastiCache, or similar)

2. **Update `main.py` line 15** to use Redis:
   ```python
   limiter = Limiter(
       key_func=get_tenant_id, 
       default_limits=["100/minute"],
       storage_uri="redis://your-redis-host:6379"
   )
   ```

3. **Add Redis dependency** to `requirements.txt`:
   ```
   redis==5.0.1
   ```

4. **Add environment variable** to `render.yaml`:
   ```yaml
   - key: REDIS_URL
     sync: false
   ```

### Why this matters:
Without Redis, each backend instance maintains its own rate limit counter. A tenant can bypass limits by distributing requests across instances (effective limit becomes `100/min × N instances`).

## Other Production Requirements

- Set `SENDGRID_API_KEY` for email notifications
- Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` for S3 storage
- Configure S3 bucket lifecycle policy to delete objects tagged with `retention=24h`
- Set `OPENAI_API_KEY` for Clawi worker (if using real LLM generation)
