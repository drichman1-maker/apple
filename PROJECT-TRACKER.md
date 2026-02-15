# PROJECT TRACKER
*Last updated: 2026-02-06*

---

## 1. LowkeyMode (meditation app)
**Status:** Planning/pre-launch

**What it is:**
- Privacy-first meditation app
- Sound measurement (dB/Hz)
- Community features
- $5/mo or $40/year

**Tech:** Swift (iOS) + Node (web) + Python (backend)

**Files:**
- `lowkey/ad-scripts.md` — video ad scripts + Creatify/Arcads briefs
- `lowkey/ambassador-onboarding.md` — privacy-respecting referral program
- `lowkey/tally-form-setup.md` — ambassador application form
- `lowkey/deployment-checklist.md` — App Store launch checklist

**Next steps:**
- [ ] Export code from Google Antigravity
- [ ] Clone to Mac via GitHub
- [ ] Open in Xcode
- [ ] Test on real device
- [ ] Submit v1 to App Store
- [ ] Set up Telegram community

---

## 2. HealthIndex (wellness machines ecommerce)
**Status:** Domain purchased, planning

**What it is:**
- Domain: healthindex.com
- Sells wellness machines (red light, PEMF, sauna, etc.)
- Needs backend for catalog, cart, orders

**Files:**
- `shared-backend-architecture.md` — FastAPI backend design

**Next steps:**
- [ ] Design product catalog structure
- [ ] Build landing page
- [ ] Set up Render backend
- [ ] Connect Stripe for payments

---

## 3. Telegram Community (LowkeyMode)
**Status:** Planned

**Structure:**
```
LowkeyMode Community (Private Group)
├── Welcome (pinned rules, intro)
├── #daily-checkins
├── #quiet-scores
├── #wins (anonymous feel-good stories)
├── #challenges
├── #general
└── #ambassadors (invite-only)
```

**Features:**
- Reputation bot tracking participation
- Monthly challenges with gift card prizes
- Founding Members program (first 100 users)
- Privacy-respecting referral codes

**Next steps:**
- [ ] Create Telegram group
- [ ] Set up welcome bot
- [ ] Write community rules
- [ ] Plan first month's challenge

---

## 4. Backend Infrastructure
**Status:** Planned

**Stack:**
| Service | Purpose | Cost |
|---------|---------|------|
| Render | FastAPI + Docker | $7/mo |
| Render Postgres | Database | $7/mo |
| Cloudflare R2 | File storage | Free (10GB) |
| Cloudflare Pages | Web hosting | Free |
| APNs | iOS push | Free |
| Postmark | Email | Free (100/mo) |
| Apple Developer | App Store | $99/year |

**Total:** ~$14/mo + $99/year

**Next steps:**
- [ ] Create Render account
- [ ] Deploy FastAPI skeleton
- [ ] Set up Postgres
- [ ] Configure R2 bucket

---

## 5. Future Projects
- 4-5 more dual iOS/web apps
- Aggregators and marketplaces
- baselinedesigns.com (main portfolio site?)

---

## OpenClaw Setup
**Current config:**
- Main model: Claude (anthropic)
- Subagent model: Ollama (qwen3:8b)
- Telegram: Connected
- Brave Search: Connected
- Heartbeats: Disabled

**Best practices:**
1. `/model ollama/qwen3:8b` for simple tasks
2. `/model anthropic/claude-sonnet-4-20250514` for complex
3. `/reset` often to save tokens
4. Keep messages concise
