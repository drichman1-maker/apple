# MEMORY.md — Long-Term Memory

## Henry's Best Practices (Don't Repeat Mistakes)

### Content Creation → Deployment Pipeline
**Rule:** Every piece of content created must be deployed within 24 hours, or it's wasted work.
- SEO articles → Must be added to site public/ folder immediately
- Code builds → Must be deployed, not just built
- Assets → Must be linked/used, not just stored

### Check Before Building
**Rule:** Before starting any "new" build, check what already exists.
- `ls -la` the directory first
- Check git history
- Ask: "Did we already start this?"

### Background Research
**Rule:** When hitting roadblocks, spawn subagent to research while continuing main work.
- Don't let blockers stop all progress
- Parallel research + execution

### Daily Standup Questions
1. What did we deploy today?
2. What content is sitting unused?
3. What did we forget to follow up on?

### Momentum Rule (Don't Get Stuck)
**When hitting a blocker → Pivot immediately.**
- 30 minutes max on any single issue
- If stuck: document it, move to next priority, come back later
- Momentum > Perfection
- Ship what works, fix what's broken later

**Build → Ship → Market → Monetize.** Don't let hurdles kill momentum.

---

## Domain & Project Mapping

| Project | Domain/URL | Status | Notes |
|---------|-----------|--------|-------|
| **Health Index** | healthindex.com | 🟢 Own domain | Wellness machines aggregator |
| **MacTrackr** | mactrackr.com | 🟢 Own domain | Apple price tracker |
| **MintCondition** | mintcondition.com | 🟢 Own domain | Comics & collectibles |
| **BaselineDesigns** | baselinedesigns.com | 🟢 Own domain | Portfolio site |
| **CodeMode** | codemodeapps.com | 🟢 Own domain | Main studio site |
| **SluggerData** | sluggerdata.com | 🟢 Own domain | Baseball cards (not built) |
| **Appliances** | appliances.codemodeapps.com | 🟡 Subdomain | Need DNS |
| **Baby Gear** | babygear.codemodeapps.com | 🟡 Subdomain | Need DNS |
| **Fixed Income** | fixedincome.codemodeapps.com | 🟡 Subdomain | Need DNS |
| **RetroRefine** | retrorefine.codemodeapps.com | 🟡 Subdomain | Video games |
| **Pokémon** | pokemon.mintcondition.com | 🟡 Subdomain | Need build |

**DNS Pattern:** All subdomains → CNAME → cname.vercel-dns.com

---

## Deployment Stack

### Frontend (Vercel)
- **MacTrackr:** https://mactrackr.com ✅
- **Health Index:** https://healthindex-frontend.vercel.app ✅ (pending healthindex.app)
- **MintCondition:** https://web-eight-lime-62.vercel.app ✅ (pending mintcondition.com)
- **CoinCurator:** https://frontend-kappa-hazel-34.vercel.app ✅ (pending coincurator.app)
- **RumbleGames:** https://rumbledeals.com ✅

### Backend (Render)
- **MacTrackr API:** mactrackr-backend-new.onrender.com ✅ (free tier)
- **Health Index API:** med-device.onrender.com 🔄 (npm fix applied)
- **CoinCurator API:** Not deployed (render.yaml ready)

---

## GitHub Repositories

| Project | Repo | Status |
|---------|------|--------|
| MacTrackr Frontend | drichman1-maker/apple | ✅ Active |
| MacTrackr Backend | drichman1-maker/mactrackr-api | ✅ Active |
| Health Index Frontend | Local only | ⚠️ No remote |
| Health Index Backend | drichman1-maker/Med-device | ✅ Active |
| MintCondition | drichman1-maker/grailwatch | ✅ Active |
| CoinCurator | drichman1-maker/coin-agg | ✅ Active |
| RumbleGames | drichman1-maker/videogames | ✅ Active |
| Robot Aggregator | drichman1-maker/*room | 🆕 New (check after meditation) |

---

## Tonight's Wins (Feb 16, 2026)

### Sites Shipped: 5/5
1. **MacTrackr** - Product images + dark mode
2. **Health Index** - Dark mode + TypeScript fixes
3. **MintCondition** - Production files + articles deployed
4. **CoinCurator** - Frontend deployed, backend config ready
5. **RumbleGames** - Verified deployment

### Commits Made: 7
- MacTrackr backend fix
- MacTrackr product images
- MacTrackr dark mode
- Health Index dark mode
- Health Index TypeScript fix
- MintCondition production files
- CoinCurator render.yaml

### Documentation Created
- MEMORY.md infrastructure scaling section
- domain-config-checklist.md
- memory/2026-02-16.md (full session log)

---

## Infrastructure Scaling & Upgrade Strategy (Ongoing Conversation)

### Current State (Feb 2026)
**Render Free Tier Issues:**
- Free instances spin down after inactivity → 50-second cold starts
- Impacts user experience significantly
- Affects: Health Index, MacTrackr backends

**Current Monthly Costs:**
- Render: $0 (free tier)
- Vercel: $0 (hobby plan)
- Total hosting: **$0/month**

### Upgrade Trigger Points
**When to upgrade Render ($7/month Starter):**
- [ ] When >100 daily active users
- [ ] When cold start complaints increase
- [ ] When affiliate revenue > $50/month (covers 7x the cost)

**When to consolidate backends ($15/month Team):**
- [ ] When managing 5+ separate services
- [ ] When unified API makes sense architecturally
- [ ] When costs are justified by traffic/revenue

### Mac Studio Purchase Decision
**Cost:** $2,000-4,000 (M2 Max/Ultra)
**Current API spend:** ~$15/day active usage (~$450/month)
**Break-even:** 133-266 days of heavy usage

**Criteria for purchase:**
- [ ] Consistent $1,000+/month API spend for 3 months
- [ ] Need for 24/7 local inference
- [ ] Privacy/compliance requirements for enterprise clients
- [ ] MRR > $5K justifying capital investment

**Better near-term alternatives:**
- Optimize model selection (already doing)
- Batch operations to reduce calls
- Use cheaper models for routine tasks
- Leverage free tiers (Groq, Ollama)

### Ship First, Scale Later
**Core principle:** Don't let infrastructure decisions block deployment.
- Deploy on free tiers
- Monitor usage/complaints
- Upgrade when justified by metrics or revenue
- Document upgrade triggers in this section

**Red flags requiring immediate upgrade:**
- User complaints about slowness
- Lost affiliate conversions due to performance
- Backend errors causing data loss

### Scaling Milestones
| Milestone | Action | Est. Cost | When |
|-----------|--------|-----------|------|
| 100 DAU | Upgrade Render to Starter | +$7/mo | TBD |
| 500 DAU | Consolidate backends | +$15/mo | TBD |
| $1K MRR | Dedicated database | +$25/mo | TBD |
| $5K MRR | Consider Mac Studio | $2-4K one-time | TBD |
| 10K DAU | CDN for static assets | +$20/mo | TBD |

### Database Upgrade (MacTrackr Specific)
**Current:** Render Postgres Free (expires March 16, 2026)
**Issue:** 90-day data retention limit
**Options:**
1. Upgrade to Render Starter DB ($7/mo) — unlimited retention
2. Migrate to Supabase free tier — 500MB limit
3. Self-host on Railway/Fly.io — ~$5-10/mo

**Decision pending:** Wait until Feb 28 reminder, then upgrade if affiliate revenue justifies.

---

**Last updated:** February 16, 2026
**Next review:** When first site hits 100 DAU or $50/month revenue