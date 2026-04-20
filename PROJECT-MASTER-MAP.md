# PROJECT MASTER MAP
## Complete Audit — Feb 16, 2026

## First Tier (Priority)

### 1. Health Index
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | healthindex.app | ✅ Purchased, DNS pending |
| **GitHub Repo** | drichman1-maker/Med-device | ✅ Connected |
| **Local Folder** | healthindex-prod/ | ✅ Active |
| **Deploy Target** | Vercel | ✅ Live |
| **Backend** | N/A (static) | — |
| **Notes** | Wellness equipment sourcing, B2B consultative |

### 2. TheresMac
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | theresmac.com | ✅ DNS configured |
| **GitHub Repo (Frontend)** | drichman1-maker/apple | ✅ Connected |
| **GitHub Repo (Backend)** | drichman1-maker/mactrackr-api | ⚠️ Need to create/push |
| **Local Folder (Frontend)** | mactrackr-frontend/ | ✅ Active |
| **Local Folder (Backend)** | mactrackr-backend/ | ✅ Active |
| **Deploy Target** | Vercel (frontend), Render (backend) | ⚠️ Backend not deployed |
| **Notes** | Apple price tracker, affiliate revenue |

### 3. LowKeyMode
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | lowkeymode.app (planned) | 🟡 Not purchased |
| **GitHub Repo** | drichman1-maker/soundcheck | ✅ Connected |
| **Local Folder** | LowKeyMode/ | ✅ Active |
| **Deploy Target** | App Store | 🔴 Xcode blocked |
| **Notes** | Meditation + sound measurement iOS app |

## Second Tier

### 4. MintCondition
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | mintcondition.com | ✅ Owned |
| **Subdomain** | pokemon.mintcondition.com | 🟡 Need DNS |
| **GitHub Repo** | drichman1-maker/pokemon-agg | ✅ Connected |
| **Local Folder** | mintcondition-pokemon/ | ✅ Active |
| **Deploy Target** | Vercel | 🟡 Not deployed |

### 5. SluggerData
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | sluggerdata.com | ✅ Owned |
| **GitHub Repo** | (Need to create) | 🔴 Missing |
| **Local Folder** | (Need to check) | 🟡 Unknown |
| **Deploy Target** | Vercel | 🔴 Not started |

### 6. Baby Gear
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | babygear.codemodeapps.com | 🟡 Need DNS |
| **GitHub Repo** | drichman1-maker/gear | ✅ Connected |
| **Local Folder** | babygear-codemode/ | ✅ Active |
| **Deploy Target** | Vercel | 🟡 Not deployed |

### 7. TaskBidder.io
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | taskbidder.io | 🟡 Check availability |
| **GitHub Repo** | drichman1-maker/handymanpaint | ✅ Connected |
| **Local Folder** | taskbidder-codemode/ | ✅ Active |
| **Deploy Target** | Vercel | 🟡 Not deployed |

### 8. Coin Curator
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | (Need to check) | 🟡 Unknown |
| **GitHub Repo** | drichman1-maker/coin-agg | ✅ Connected |
| **Local Folder** | coincurator-codemode/ | ✅ Active |
| **Deploy Target** | Vercel | 🟡 Not deployed |
| **Notes** | Same repo as coin-agg? Check for duplicates |

### 9. Rumble Deals
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | (Need subdomain) | 🟡 Unknown |
| **GitHub Repo** | drichman1-maker/videogames | ✅ Connected |
| **Local Folder** | rumbledeals-codemode/ | ✅ Active |
| **Deploy Target** | Vercel | 🟡 Not deployed |

### 10. Comics (MintCondition)
| Attribute | Value | Status |
|-----------|-------|--------|
| **Domain** | comics.mintcondition.com | 🟡 Need DNS |
| **GitHub Repo** | drichman1-maker/grailwatch | ✅ Connected |
| **Local Folder** | comics-mintcondition/ | ✅ Active |
| **Deploy Target** | Vercel | 🟡 Not deployed |

## Subdomain Projects (codemodeapps.com)

| Project | Subdomain | Repo | Local Folder | Status |
|---------|-----------|------|--------------|--------|
| Appliances | appliances.codemodeapps.com | appliance-scout | appliances-codemode/ | 🟡 Need DNS |
| Auto Parts | autoparts.codemodeapps.com | auto | autoparts-codemode/ | 🟡 Need DNS |
| Fixed Income | fixedincome.codemodeapps.com | fixed-income-agg | fixed-income-codemode/ | 🟡 Need DNS |
| Watches | watches.codemodeapps.com | timepie | watches-codemode/ | 🟡 Need DNS |
| Wine | wine.codemodeapps.com | alch | wine-codemode/ | 🟡 Need DNS |
| Video Games | **rumbdeals.com** | video-game-agg | videogames-agg/ | 🟡 Need deploy |

## Clarified Mappings (Not Duplicates)

✅ **Coin Curator = Coin Agg** — Same project, different folder names  
✅ **Video Games = Video Game Agg** — Same project, intentional  
✅ **Rumble Deals** — Uses videogames repo (intentional reuse)

## Projects Built By AI (Need Repos)

1. **Slugger Data** — Created during session, needs GitHub repo + domain  
   (Folder location? Need to identify)
2. Any others built without repos?

## Missing GitHub Repos

Need to create repos for:
- mactrackr-backend → mactrackr-api
- sluggerdata (if not exists)
- Any consolidated mono-repo option?

## DNS Status Summary

| Domain/Subdomain | A Record | CNAME | Vercel Project | Status |
|------------------|----------|-------|----------------|--------|
| healthindex.app | 76.76.21.21 | — | healthindex-prod | ✅ Pending propagation |
| theresmac.com | 76.76.21.21 | www→vercel | mactrackr-frontend | ✅ Pending propagation |
| heathindex.com | 76.76.21.21 | www→vercel | — | ⚠️ Typo domain (keep?) |
| *.codemodeapps.com | — | Need CNAME | Various | 🔴 Not configured |

## Action Items

### Immediate (Today)
1. ✅ Health Index deployed to healthindex.app
2. ✅ TheresMac frontend deployed to theresmac.com
3. ⏳ TheresMac backend deploy to Render
4. ⏳ Verify DNS propagation (5-60 min)
5. ⏳ Affiliate applications (Amazon, ShareASale, Best Buy)

### This Week
6. Connect all codemodeapps subdomains to Vercel
7. Deploy MintCondition, Baby Gear, TaskBidder
8. Resolve duplicate repo issues
9. Create missing repos (SluggerData, etc.)
10. LowKeyMode: Fix Xcode or pivot to web

---
**Last Updated:** Feb 16, 2026 15:15 EST
**Next Review:** Daily standup