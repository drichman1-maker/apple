# DEPLOYMENT PLAYBOOK
## How to Deploy Projects (Don't Forget This)

**Last Updated:** Feb 16, 2026  
**Tested With:** Health Index, MacTrackr, RumbleDeals

---

## STANDARD DEPLOYMENT FLOW

### Step 1: Verify GitHub Repo Connection
```bash
cd /Users/douglasrichman/.openclaw/workspace/[project-folder]
git remote -v
```
**If no remote:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/drichman1-maker/[REPO-NAME].git
git push -u origin main
```

### Step 2: Add .gitignore (CRITICAL)
**Before pushing node_modules:**
```bash
echo "node_modules/" > .gitignore
echo ".next/" >> .gitignore
echo ".vercel/" >> .gitignore
echo "dist/" >> .gitignore
git add .gitignore
git commit -m "Add gitignore"
git push
```
**If you already pushed node_modules:**
```bash
rm -rf node_modules
git filter-branch --force --index-filter 'git rm --cached -r --ignore-unmatch node_modules/' --prune-empty --tag-name-filter cat -- --all
git push origin main --force
```

### Step 3: Deploy to Vercel
```bash
npx vercel --prod --yes
```
**Output will show:**
- Production URL: `https://[project]-[hash].vercel.app`
- Aliased URL: `https://[project].vercel.app`

### Step 4: Add Custom Domain
```bash
npx vercel domains add [domain.com]
```
**Example:**
```bash
npx vercel domains add healthindex.app
npx vercel domains add mactrackr.com
```

### Step 5: Configure DNS (Cloudflare)
Add these records:

| Type | Name | Content |
|------|------|---------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

**In Cloudflare:**
1. Select domain
2. DNS → Records
3. Add A record: Name=`@`, Content=`76.76.21.21`
4. Add CNAME: Name=`www`, Target=`cname.vercel-dns.com`
5. Turn OFF proxy (gray cloud) for Vercel to verify

### Step 6: Verify Deployment
```bash
curl -s https://[domain.com] | head -20
```
Or check in browser.

---

## PROJECT-SPECIFIC NOTES

### Health Index (Static HTML)
- **Repo:** Med-device
- **Type:** Static HTML (no build step)
- **Domain:** healthindex.app ✅
- **Special:** Rebranded from "Aurum Wellness" → "Health Index"

### MacTrackr (React + Vite)
- **Frontend Repo:** apple
- **Backend Repo:** mactrackr-api
- **Frontend Domain:** mactrackr.com ✅
- **Backend:** Render (needs env vars)
- **Build:** `npm run build` (creates dist/)
- **API URL:** Set in .env.production: `VITE_API_URL=https://mactrackr-backend.onrender.com`

### RumbleDeals (Next.js)
- **Repo:** videogames
- **Type:** Next.js (pages router)
- **Domain:** rumbledeals.com
- **Backend:** videogames-agg (Python/FastAPI)

---

## BACKEND DEPLOYMENT (Render)

### Step 1: Create repo (if not exists)
```bash
cd [backend-folder]
git init
git add .
git commit -m "Backend init"
git remote add origin https://github.com/drichman1-maker/[backend-repo].git
git push -u origin main
```

### Step 2: Deploy to Render
1. Go to https://dashboard.render.com
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - Build Command: `npm install` (Node) or `pip install -r requirements.txt` (Python)
   - Start Command: `npm start` or `python main.py`
5. Add Environment Variables:
   - `DATABASE_URL`
   - `PORT`
   - `NODE_ENV=production`
6. Deploy

### Step 3: Connect Frontend
Update frontend `.env.production`:
```
VITE_API_URL=https://[backend-name].onrender.com
```
Redeploy frontend.

---

## DOMAIN SETUP CHECKLIST

Before adding domain to Vercel:
- [ ] Domain purchased (Cloudflare, Namecheap, etc.)
- [ ] DNS access available
- [ ] A record set to 76.76.21.21
- [ ] CNAME www set to cname.vercel-dns.com

After Vercel deploy:
- [ ] Domain shows in Vercel dashboard
- [ ] SSL certificate auto-generated (takes 2-5 min)
- [ ] Browser shows HTTPS lock
- [ ] Mobile test passes

---

## TROUBLESHOOTING

**Git push fails (large files):**
```bash
rm -rf node_modules
git filter-branch --force --index-filter 'git rm --cached -r --ignore-unmatch node_modules/' --prune-empty --tag-name-filter cat -- --all
git push origin main --force
```

**Vercel deploy fails:**
- Check `vercel.json` config
- Check build command in package.json
- Check for missing env vars

**DNS not propagating:**
- Check with: `dig +short [domain.com]`
- Should return: `76.76.21.21`
- TTL is usually 5-60 minutes

**Backend connection fails:**
- Verify CORS settings
- Check Render service is "Live"
- Test: `curl https://[backend]/api/health`

---

## ACTIVE DEPLOYMENTS

| Project | Domain | Repo | Status | Backend |
|---------|--------|------|--------|---------|
| Health Index | healthindex.app | Med-device | ✅ Live | N/A |
| MacTrackr | mactrackr.com | apple | ✅ Live | 🔴 Backend 404 (needs Render deploy) |
| RumbleDeals | rumbledeals.com | videogames | ⏳ DNS pending | Render (deploy) |

## CURRENT GIT/DEPLOY STATUS

**Health Index:**
- Domain: healthindex.app ✅
- Repo: Med-device ✅
- Deploy: Vercel ✅
- Mobile: Tested ✅

**MacTrackr:**
- Frontend Domain: mactrackr.com ✅
- Frontend Repo: apple ✅
- Frontend Deploy: Vercel ✅
- Backend Repo: mactrackr-api 🔴 (needs creation)
- Backend Deploy: Render 🔴 (404 error)

**Next Steps:**
1. Create mactrackr-api GitHub repo
2. Push backend code
3. Deploy to Render with env vars
4. Update frontend env to connect backend

---

**Remember:**
1. Always add .gitignore FIRST
2. Never commit node_modules
3. Test backend before frontend
4. DNS takes 5-60 minutes to propagate
5. Document domain/repo mapping in MEMORY.md