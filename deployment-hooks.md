# Deployment Hooks - Feb 16, 2026

## Vercel Deployments

### Health Index
```bash
vercel domains add healthindex-frontend healthindex.app
vercel --prod
```

### MintCondition (Comics/Cards)
```bash
vercel domains add web-eight-lime-62 mintcondition.app
vercel --prod
```

### CoinCurator (Crypto)
```bash
vercel domains add frontend-kappa-hazel-34 coincurator.app
vercel --prod
```

### Robot Atlas (NEW!)
```bash
vercel domains add robots.codemodeapps.com
vercel --prod
```

## DNS Records (Add to Cloudflare/DNS Provider)

### Primary Domains
| Domain | Type | Name | Value |
|--------|------|------|-------|
| healthindex.app | CNAME | @ | cname.vercel-dns.com |
| mintcondition.app | CNAME | @ | cname.vercel-dns.com |
| coincurator.app | CNAME | @ | cname.vercel-dns.com |

### Subdomains
| Domain | Type | Name | Value |
|--------|------|------|-------|
| codemodeapps.com | CNAME | robots | cname.vercel-dns.com |

## Backend Domains (Render)

### Health Index API
```bash
# In Render Dashboard:
Custom Domain: api.healthindex.app → med-device.onrender.com
```

### CoinCurator API
```bash
# In Render Dashboard:
Custom Domain: api.coincurator.app → [deploy-from-blueprint-first]
```

## Steps for Each Site

1. Configure Vercel domain
2. Add DNS records
3. Wait for SSL provisioning
4. Test deployment
5. Configure backend API domain (if applicable)
6. Update CORS settings