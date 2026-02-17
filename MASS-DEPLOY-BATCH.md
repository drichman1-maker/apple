# MASS DEPLOY BATCH - Feb 16, 2026
## Deploying 7 Projects Simultaneously

### Project List

| # | Project | Folder | Domain | Repo | Status |
|---|---------|--------|--------|------|--------|
| 1 | RumbleDeals | rumbledeals-codemode/ | rumbledeals.com | videogames | ✅ Ready |
| 2 | CoinCurator | coincurator-codemode/ | coincurator.com (?) | coin-agg | ✅ Ready |
| 3 | BabyGear | babygear-codemode/ | babygear.codemodeapps.com | gear | ✅ Ready |
| 4 | Appliances | appliances-codemode/ | appliances.codemodeapps.com | appliance-scout | ✅ Ready |
| 5 | Autoparts | autoparts-codemode/ | autoparts.codemodeapps.com | auto | ✅ Ready |
| 6 | Wine | wine-codemode/ | wine.codemodeapps.com | alch | ✅ Ready |
| 7 | Watches | watches-codemode/ | watches.codemodeapps.com | timepie | ✅ Ready |

### DNS Records Needed (Cloudflare)

**For rumbledeals.com:**
- Type: A, Name: @, Content: 76.76.21.21
- Type: CNAME, Name: www, Content: cname.vercel-dns.com

**For coincurator.com (if owned):**
- Type: A, Name: @, Content: 76.76.21.21
- Type: CNAME, Name: www, Content: cname.vercel-dns.com

**For codemodeapps.com subdomains:**
- Type: CNAME, Name: babygear, Content: cname.vercel-dns.com
- Type: CNAME, Name: appliances, Content: cname.vercel-dns.com
- Type: CNAME, Name: autoparts, Content: cname.vercel-dns.com
- Type: CNAME, Name: wine, Content: cname.vercel-dns.com
- Type: CNAME, Name: watches, Content: cname.vercel-dns.com

### Deploy Commands

```bash
# 1. RumbleDeals
cd rumbledeals-codemode && npx vercel --prod --yes && npx vercel domains add rumbledeals.com

# 2. CoinCurator
cd coincurator-codemode && npx vercel --prod --yes && npx vercel domains add coincurator.com

# 3. BabyGear
cd babygear-codemode && npx vercel --prod --yes && npx vercel domains add babygear.codemodeapps.com

# 4. Appliances
cd appliances-codemode && npx vercel --prod --yes && npx vercel domains add appliances.codemodeapps.com

# 5. Autoparts
cd autoparts-codemode && npx vercel --prod --yes && npx vercel domains add autoparts.codemodeapps.com

# 6. Wine
cd wine-codemode && npx vercel --prod --yes && npx vercel domains add wine.codemodeapps.com

# 7. Watches
cd watches-codemode && npx vercel --prod --yes && npx vercel domains add watches.codemodeapps.com
```

### Questions Before Deploy

1. **CoinCurator domain** — Do you own coincurator.com or use subdomain?
2. **DNS confirmation** — Are all codemodeapps.com subdomains ready for CNAME records?
3. **Order** — Deploy all at once or sequential?

### Expected Timeline
- DNS propagation: 5-60 minutes
- Vercel builds: 2-3 minutes each
- Total: ~30 minutes for all 7

### Post-Deploy Verification
```bash
# Check all domains
curl -s https://rumbledeals.com | head -5
curl -s https://babygear.codemodeapps.com | head -5
curl -s https://appliances.codemodeapps.com | head -5
# ... etc
```