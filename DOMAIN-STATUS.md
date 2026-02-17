# DOMAIN STATUS - Feb 16, 2026

## ✅ CONFIRMED WORKING

### Health Index
- **Domain:** healthindex.app ✅
- **Status:** LIVE
- **Frontend:** https://healthindex-frontend.vercel.app
- **Backend:** med-device.onrender.com
- **Dark Mode:** Default

---

## 🔄 PENDING CONFIGURATION

### MintCondition
- **Domain:** mintcondition.app
- **Current URL:** https://web-eight-lime-62.vercel.app
- **Action Needed:** Add domain in Vercel dashboard
- **DNS:** CNAME mintcondition.app → cname.vercel-dns.com

### CoinCurator
- **Domain:** coincurator.app
- **Current URL:** https://frontend-kappa-hazel-34.vercel.app
- **Action Needed:** Add domain in Vercel dashboard
- **DNS:** CNAME coincurator.app → cname.vercel-dns.com
- **Backend:** Deploy render.yaml to Render

### Robot Atlas
- **Domain:** robots.codemodeapps.com (subdomain)
- **Current:** Deploying...
- **Action Needed:** Add subdomain in Vercel + DNS
- **Backend:** Build backend API

---

## 📝 Vercel Domain Commands

```bash
# MintCondition
vercel domains add web-eight-lime-62.vercel.app mintcondition.app

# CoinCurator  
vercel domains add frontend-kappa-hazel-34.vercel.app coincurator.app

# Robot Atlas
vercel domains add robot-aggregator.vercel.app robots.codemodeapps.com
```

---

## 🔧 DNS Records (Cloudflare/Provider)

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

For subdomains:
Type: CNAME
Name: robots
Value: cname.vercel-dns.com
```

---

## ⏭️ NEXT STEPS

1. ✅ Health Index - DONE
2. 🔄 MintCondition - Add domain
3. 🔄 CoinCurator - Add domain + deploy backend
4. 🔄 Robot Atlas - Complete deployment + subdomain
5. ⏳ SluggerData - Build from scratch

Last Updated: Feb 16, 2026 10:40 PM EST