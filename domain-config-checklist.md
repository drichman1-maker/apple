# Domain Configuration Checklist

## Current Deployments (Vercel Subdomains)

| Site | Current URL | Target Domain | Status |
|------|-------------|---------------|--------|
| MacTrackr | https://mactrackr.com | mactrackr.com | ✅ DONE |
| Health Index | https://healthindex-frontend.vercel.app | healthindex.com | ⏳ PENDING |
| MintCondition | https://web-eight-lime-62.vercel.app | mintcondition.com | ⏳ PENDING |
| CoinCurator | https://frontend-kappa-hazel-34.vercel.app | TBD | ⏳ PENDING |
| RumbleGames | Deploying... | rumbledeals.com | ⏳ PENDING |

## Configuration Steps

### 1. Health Index → healthindex.com
```
Vercel Dashboard → healthindex-frontend → Settings → Domains
Add: healthindex.com
```
DNS: Add CNAME record pointing to `cname.vercel-dns.com`

### 2. MintCondition → mintcondition.com
```
Vercel Dashboard → web-eight-lime-62 → Settings → Domains
Add: mintcondition.com
```
DNS: Add CNAME record pointing to `cname.vercel-dns.com`

### 3. CoinCurator → TBD
Need to determine domain:
- Option A: coincurator.com (if owned)
- Option B: coins.mintcondition.com (subdomain)
- Option C: Keep Vercel subdomain for now

### 4. RumbleGames → rumbledeals.com
```
Vercel Dashboard → rumbledeals → Settings → Domains
Add: rumbledeals.com
```
DNS: Add CNAME record pointing to `cname.vercel-dns.com`

## Backend Domains (Render)

| Backend | Current | Target | Status |
|---------|---------|--------|--------|
| MacTrackr API | mactrackr-backend-new.onrender.com | api.mactrackr.com | ⏳ PENDING |
| Health Index API | med-device.onrender.com | api.healthindex.com | ⏳ PENDING |
| CoinCurator API | Not deployed | api.coincurator.com | ⏳ PENDING |

### Render Custom Domain Setup
1. Render Dashboard → Service → Settings → Custom Domain
2. Add: api.mactrackr.com
3. DNS: Add CNAME pointing to Render service URL
4. Wait for SSL certificate provisioning

## Priority Order
1. MacTrackr (already done)
2. RumbleGames (in progress)
3. MintCondition (high value domain)
4. Health Index
5. CoinCurator
