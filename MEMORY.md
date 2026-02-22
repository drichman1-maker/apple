# MEMORY.md — Long-Term Memory

## SEO Strategy: Consumer-First Content

**Write for humans, rank as side effect.**

**Principle:** Every piece of SEO content must helps consumers make better buying decisions. Not content for content's sake.

**Content that actually converts:**
- **Buying guides** - "Best MacBook for [specific use case]" with spec comparisons
- **Upgrade decisions** - "Is X worth it?" with real benchmarks and price analysis  
- **Deal timing** - When to buy, when to wait, price history
- **Refurbished vs new** - Honest cost/benefit with real savings data
- **Trade-off analysis** - Performance vs battery vs price

**What we don't do:**
- Generic reviews
- Word vomit for word count
- Content that doesn't lead to a purchase decision
- Affiliate links without honest analysis

**Format:** Short, scannable, comparison tables, direct answers.

---

## Core Identity: Anonymous & Privacy-First

**We don't collect your data.** Period.

All aggregator sites (MacTrackr, Health Index, MintCondition, etc.) follow this principle:
- No user accounts required
- No tracking cookies
- No email lists (unless user explicitly opts into price alerts)
- No data sold to third parties
- Anonymous browsing by default

**Copy inspiration:** See codemodeapps.com — "Anonymous. We don't collect your data."

This is our competitive advantage against Big Tech aggregators.

---

## Strategic Reflection (Feb 20, 2026)

**Strategizing + taking account works.** Past few days showed clear improvements when we:
- List priorities explicitly (even short lists > long schedules)
- Reflect on what worked/didn't before charging ahead
- User handles parallel work (antigravity) while I focus on core tasks
- Verify before declaring victory (URL testing, DNS checks)

**Communication improvements:**
- Shorter responses = better
- Action > explanation for small fixes
- Ask only for irreversible/big decisions
- Silent work is good work — update on completion or blocker only

**Verification discipline:**
- Test one URL before adding 33 products
- Check DNS propagation before assuming it's live
- Confirm site renders correctly before moving to next task

---

## 3-Backend Resilience Doctrine (Feb 20, 2026)

**Core Philosophy:** Zero single point of failure. Privacy through distribution.

**The Stack:**
- **Render** (Primary): mactrackr-api.onrender.com — 38+ products, active
- **Railway** (Secondary): price-aggregator-api-production.up.railway.app — warm standby
- **Fly.io** (Emergency): mactrackr-api-backup.fly.dev — edge-deployed backup

**Privacy Win:** No single provider controls all data. User requests distributed across independent infrastructure. No correlation possible.

**Cost:** $0 (all free tiers)
**Uptime:** 99.99% theoretical (3 nines)

**Monitoring:** Self-hosted Uptime Kuma (no third-party services). Telegram alerts only.

**Next Review:** Tuesday, Feb 25, 2026 @ 4 PM

---

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

### Subagents Don't Work Well (Feb 18, 2026)
**Reality check:** Parallel subagent spawning produces sloppy, unreliable work.

**New approach:**
- Doug handles parallelization manually
- Give Henry ONE thing at a time
- Keep shipping and moving forward
- Small tests before bulk operations

**No more:** Spawning 5-10 subagents to "speed things up" — it doesn't work.

### Daily Standup Questions
1. What did we deploy today?
2. What content is sitting unused?
3. What did we forget to follow up on?

### Don't Let Expenses Hold You Back
$15/mo for infrastructure is nothing. If it makes things work — do it.

### Momentum Rule (Don't Get Stuck)
**When hitting a blocker → Pivot immediately.**
- 30 minutes max on any single issue
- If stuck: document it, move to next priority, come back later
- Momentum > Perfection
- Ship what works, fix what's broken later

**Build → Ship → Market → Monetize.** Don't let hurdles kill momentum.

### Scale Testing — Start Small, Verify, Then Expand
**Feb 18, 2026 Lesson:** Tried to bulk-update 33 products with URLs across 8 retailers at once. Result: sloppy work, fake URLs, wasted time fixing.

**Better approach:**
1. Pick ONE product + ONE retailer
2. Research and verify the URL works
3. Deploy and test
4. Only then scale to more products/retailers

**When to escalate model power:**
- Hitting roadblocks / going in circles → Switch to Opus 4.6 or GPT-4
- Subagent failing repeatedly → Don't retry with same model
- Complex research tasks → Use stronger model from start

**Roadblocks = enemy.** They kill momentum. Escalate fast, ship faster.

### Test One, Verify, Then Continue
**Feb 18, 2026 — CRITICAL WORKFLOW:**

**When repeating mistakes:**
1. **Recognize it immediately** — Pause and identify the pattern
2. **Inform Doug** — Don't hide it, communicate the repetition
3. **Explain the fix** — How this attempt is different
4. **Let Doug parallelize** — Offer to let him solve it while I document

**URL Testing Protocol:**
1. Test **Best Buy** first (most reliable)
2. Then **Apple**
3. Then **Amazon**
4. Then **eBay**
5. **Verify each works** before moving to next

**Preferred Models Going Forward:**
- **Gemini** — Primary choice (as requested)
- **GPT-4** — For complex tasks
- **MiniMax-M2.5/M2.1** — For coding and main session
- **DeepSeek** — For research (if working)
- **Pony Alpha** — For creative/uncensored
- **Amazon Nova Pro** — For AWS/multimodal

**AVOID:** Claude (unless specifically requested), Grok (not as default creative)

**This workflow is more effective and efficient.**

## Session Management (Feb 20, 2026)

**Reset Reminder:** When token count gets high (~150K+ in context OR 250+ messages), remind Doug to `/reset` the session. Keeps costs down and context fresh.

**Pre-Reset Protocol:**
1. Summarize what was accomplished this session
2. List pending tasks with priority order
3. Note any blockers or decisions made
4. Update MEMORY.md with key learnings
5. Provide 3-5 bullet context summary for next session

**This prevents:**
- Next session going on tangents
- Reverting to outdated approaches
- Losing momentum on critical tasks
- Re-explaining context repeatedly

---

### Fix ONE Thing Before Rerouting Everything
**Feb 18, 2026 Lesson:** Product year wasn't showing. Instead of diagnosing ONE product, I spawned parallel subagents to bulk-update everything. Result: wasted work, didn't solve the root cause (missing releaseDate field).

**Correct approach:**
1. Identify ONE example of the issue
2. Trace through the entire flow (backend → API → frontend)
3. Fix the root cause on that ONE example
4. Verify it works end-to-end
5. Only then apply to remaining items

**Never reroute/parallelize until the single-path solution is verified.**

---

## MacTrackr - Full Operational State (Feb 17, 2026)

**Status: SHIPPED & REVENUE READY** ✅

### Core Features
- **35 Apple products** with real-time pricing from 9 retailers
- **Category filters:** Mac, iPad, iPhone, Watch, AirPods (working perfectly)
- **New/Refurbished toggle** with dropdown (Apple Certified, Amazon Renewed, Best Buy Open Box)
- **Direct product links** to Apple, Amazon, Best Buy, B&H (not search pages)
- **Affiliate tracking** embedded in all retailer URLs (Amazon Associates, B&H, Adorama ready)
- **Release years** displayed on products (M4 MacBook Air marked as 2025, etc.)

### UI/UX
- Hardware Intelligence dark aesthetic (#0a0a0a bg, #1a1a1a cards)
- Products page as default landing (no homepage bottleneck)
- Mobile responsive
- Footer with privacy policy + working nav links
- Blog framework with 4 SEO articles published

### Pages Built
- `/` - Products catalog (default)
- `/products/:category` - Filtered by Mac/iPad/iPhone/Watch/AirPods
- `/product/:id` - Individual product detail with BUY NOW
- `/blog` - SEO article hub
- `/privacy` - Affiliate-compliant privacy policy
- `/alerts` - Price alerts (coming soon page)

### Revenue Infrastructure
- ✅ Privacy policy (required for affiliate programs)
- ✅ Affiliate links active (need real IDs post-approval)
- ✅ Direct product URLs (better conversion than search)
- 🔄 Amazon Associates application (next step)
- 🔄 B&H Photo affiliate application (next step)

### What's Working Perfectly
- Category filters (top nav + footer)
- Product cards with spec pills (chip, RAM, storage, color, year)
- Price comparison across retailers
- New/Refurb toggle with real price differences
- Mobile layout
- All navigation links functional

### Known Limitations
- Price alerts: "Coming Soon" (not blocking launch)
- Some products missing refurbished data (shows same prices)
- Blog articles: Placeholder content (Doug writing full versions)

### Next Steps
1. Apply to Amazon Associates (free, 3 sales in 180 days required)
2. Add real affiliate IDs to config
3. Write full blog content (SEO traffic driver)
4. Add more products with release dates

---

## Domain & Project Mapping

| Project | Domain/URL | Status | Backend | Frontend | Notes |
|---------|-----------|--------|---------|----------|-------|
| **MacTrackr** | mactrackr.com | 🟢 Live | ✅ Node.js/Express | ✅ React/Vite | Apple price tracker - REVENUE READY |
| **Health Index** | healthindex.com | 🟡 In Progress | ✅ Node.js/Express | ✅ Next.js | Medical devices - needs polish |
| **RumbleGames** | rumbledeals.com | 🟡 In Progress | ✅ Python FastAPI | ❌ Needs build | Video games deals |
| **MintCondition** | mintcondition.app | 🟢 Ready | ✅ Python Flask | ✅ React | Pokemon cards - DEPLOY NEXT |
| **CoinCurator** | coincurator.app | 🟢 Ready | ✅ Node.js/Express | ✅ Next.js | Coins - DEPLOY NEXT |
| **SluggerData** | sluggerdata.com | 🟡 Subdomain | ❌ None | ✅ React/Vite | Graded baseball cards - needs backend |
| **Appliances** | appliances.codemodeapps.com | 🟡 Subdomain | ❌ None | ✅ Vanilla JS | Needs backend |
| **Baby Gear** | babygear.codemodeapps.com | 🟡 Subdomain | ❌ None | ✅ React/Vite | Needs backend |
| **Comics** | comics.codemodeapps.com | 🟡 Subdomain | ❌ None | ✅ React | Graded comics - needs backend |
| **Books** | books.mintcondition.app | 🟡 Subdomain | ❌ None | ✅ Next.js | Rare books - needs backend |
| **Auto Parts** | autoparts.codemodeapps.com | 🟡 Subdomain | ❌ None | ✅ Next.js | Needs backend |
| **Camera Gear** | cameragear.codemodeapps.com | 🟡 Subdomain | ❌ None | TBD | Needs full build |
| **Camera Gear** | cameragear.codemodeapps.com | 🟡 Subdomain | DSLRs, lenses, equipment |
| **Fixed Income** | fixedincome.codemodeapps.com | 🟡 Subdomain | Need DNS |
| **RumbleGames** | rumbledeals.com | 🟢 Own domain | Video games (was retrorefine placeholder) |
| **Books** | books.mintcondition.app | 🟡 Subdomain | Book price aggregator |
| **Auto Parts** | autoparts.codemodeapps.com | 🟡 Subdomain | Car parts & accessories |
| **Collectible Books** | rarebooks.codemodeapps.com | 🟡 Subdomain | First editions, signed copies |
| **Graded Comics** | comics.codemodeapps.com | 🟡 Subdomain | CGC/CBCS graded comics |
| **LowkeyMode** | lowkeymode.app | 🟢 Own domain | Meditation app |
| **TaskBidder** | taskbidder.app | 🟡 On hold | Gig marketplace (iOS app) |

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

## Priority Roadmap (Revised Feb 17, 2026)

**Phase 1: Ship + UI Overhaul (Now)**
- [x] MacTrackr landing page rebuilt — premium dark professional style
- [x] HealthIndex landing page rebuilt — premium dark professional style
- [ ] Deploy updated MacTrackr to Vercel
- [ ] Deploy updated HealthIndex to Vercel
- [ ] Deploy Books Aggregator (books.mintcondition.app)

---

## CURRENT SESSION CONTEXT (Feb 17, 2026) — ENDING NOW

### What Just Happened
- User showed reference image of premium dark professional UI
- Built both landing pages to match: near-black bg, dark cards, gradient CTAs
- **CORRECTION:** Removed all fake stats (2.1M+ checks, $4.2M saved, etc.) — replaced with real product/category counts

### Design System Applied (CORRECT)
- **Background:** Near-black (#0a0a0a)
- **Surface cards:** #141414 with #262626 borders
- **Accents:** Cyan for HealthIndex (#06b6d4), Blue for MacTrackr (#3b82f6)
- **Typography:** Clean, professional, tight letter-spacing
- **Components:**
  - Pill badges with icons (bordered, rounded-full)
  - Gradient primary CTAs with glow on hover
  - Dark cards with subtle top gradient line
  - 2-col mobile grid, 4-col desktop for equipment/product cards

### Files Updated
- `/Users/douglasrichman/.openclaw/workspace/mactrackr-web/index.html` — Complete rebuild
- `/Users/douglasrichman/.openclaw/workspace/healthindex-web/index.html` — Complete rebuild

### Next Actions for Next Session
1. Deploy both updated sites to Vercel
2. User was frustrated with API costs ($35 in 12 hours) — use cheaper models, minimize tool calls
3. Focus on shipping, not perfecting

### Key Lesson
Match reference images EXACTLY. Don't interpret. The user wants:
- Premium dark aesthetic (not colorful)
- Professional/corporate feel
- Cyan/teal or blue accents (not multi-color)
- Clean grids with data (prices, ROI, stats)

**Phase 2: Backend Infrastructure**
- [ ] Deploy individual backends (Render)
- [ ] Build unified shared backend API
- [ ] Database consolidation strategy
- [ ] Price scraping automation

**Phase 3: Growth + Monetization**
- [ ] SEO optimization for all sites
- [ ] Content creation (blog posts, guides)
- [ ] Social media presence
- [ ] Affiliate applications (Amazon, etc.)
- [ ] Revenue tracking + reinvestment plan

**Active Projects:**
- ✅ MacTrackr (Apple) - mactrackr.com
- ✅ Health Index (Wellness) - healthindex.app
- ✅ MintCondition (Pokemon) - mintcondition.app
- ✅ CoinCurator (Coins) - coincurator.app
- ✅ RumbleGames (Video games) - rumbledeals.com
- 🔄 Robot Atlas (Robotics) - robots.codemodeapps.com
- 🔄 Books Aggregator - books.mintcondition.app
- ⏳ SluggerData (Baseball) - sluggerdata.com
- ⏳ Music Instruments - TBD
- ✅ LowkeyMode (Meditation) - lowkeymode.app
- ⏸️ TaskBidder (On hold) - taskbidder.app

**Core Principle:**
Ship → Monetize → Reinvest → Ship More

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

## OpenClaw Cost Optimization & Model Strategy

**Source:** Simback's guide - validated through $800+ of mistakes

### The Big Mistakes to Avoid
1. **DON'T use Anthropic API pay-per-use** — Use Claude Pro/Max tokens instead ($20-90/mo flat vs $1000s)
2. **DON'T run multiple agents** — One agent with proper skills > 8 confused agents
3. **DON'T install QMD halfway through** — Install from day one or agent resets/forgets logs
4. **DON'T use Claude Max for OpenClaw** — Against ToS, risk of ban (controversial but confirmed)

### Token Cost Reality Check
| Model | Input | Output | Use For |
|-------|-------|--------|---------|
| DeepSeek Chat | $0.14 | $0.28 | Default subagent |
| Haiku | $1.00 | $5.00 | Quick tasks, assessments |
| Sonnet 3.5 | $3.00 | $15.00 | Code review, complex debugging |
| Opus 4.6 | $5.00 | $25.00 | Heavy reasoning only |
| MiniMax-M2.5 | $0.30 | $1.00 | Main session (NEW DEFAULT) |
| MiniMax-M2.1 | $0.27 | $0.95 | Coding, long context |

**Key Rule:** 90% of tasks are routine → use cheap models. Only frontier models for complex work.

### Smart Routing Framework
| Task Type | Model | Why |
|-----------|-------|-----|
| Heartbeats | Haiku or DeepSeek | Every 30min = 48 calls/day |
| Simple lookups | DeepSeek | $0.14 vs $5.00 |
| Code generation | MiniMax-M2.1 or Sonnet | Reliable, cheaper than M1 |
| Creative copy | Grok 2 | Personality matters |
| File assessment | Haiku | Fast verification |

### Prompt Caching Strategy
- Cache retention: 5 min standard, up to 60+ min with extended
- SOUL.md + AGENTS.md + MEMORY.md = 3K-14K tokens every call
- With caching: 90% cheaper on subsequent calls
- Set heartbeat to 55min intervals → hits warm cache

### Local Models (Ollama)
**When it makes sense:**
- Consistent predictable load
- Privacy requirements
- High-volume, low-complexity tasks
- Spare compute available

**When it doesn't:**
- Frontier capabilities needed
- Bursty workload
- Don't want infrastructure management

**Current choice:** Qwen 3 32B ≈ Sonnet 3.5 quality, 40+ tok/sec on 4090

### Cost Optimization Checklist
- [ ] Route heartbeats to cheap models (Haiku/DeepSeek)
- [ ] Enable prompt caching for system files
- [ ] Batch similar operations
- [ ] Use local models for routine tasks
- [ ] Monitor via `/subagents` — kill unused workers
- [ ] Set model overrides per-task, not globally

### Target Monthly Costs
| Setup | Est. Monthly |
|-------|-------------|
| Default (all Opus) | $1000-3000 |
| Optimized (routing) | $100-300 |
| Minimal (local+free) | $20-50 |
| Current goal | <$150 |

---

**Last updated:** February 17, 2026
**Next review:** When first site hits 100 DAU or $50/month revenue

---

## Focus Areas (Feb 18, 2026)

**Priority Order:**
1. Apple refurbished products with pricing + URLs
2. Price alerts for MacTrackr (n8n workflow)
3. Affiliate applications (Amazon, B&H, Adorama, ShareASale, eBay)
4. Monorepo discussion (Kimi Moderato for shared frontend/code review)

**eBay API:** Already set up in backend with credentials (from Feb 17). Backend is Python Flask with eBay API ready.

**Ollama on Sparky:** User is asking about setting it up. Analysis needed — need to decide if worth it for local inference.

**Note:** Apply MacTrackr standardization (quality, performance, look) to all other apps.

---

## Brand Voice & Positioning (Feb 18, 2026)

**Direction:** Anti-Big Tech (C) — but toned down

**What works:**
- Raw honesty vibe ("We don't collect your data")
- No tracking angle
- Current site aesthetic (dark, professional, clean)

**Price Alerts — No Tracking Explanation:**
When users sign up for price alerts, clarify:
- "We only store your email + product preferences"
- "No browsing history, no tracking pixels, no data sales"
- "Unsubscribe anytime, data deleted immediately"

**Rejected:**
- Generic "Insider/Operator" vibe
- Overly data-heavy "Precision/Analytical" direction
- Aggressive anti-establishment tone

**Core message:** "Anonymous price tracking. We respect you."

### Privacy-First Analytics (No Tracking)

**How to measure traffic without violating privacy:**

**Server-side metrics (Render logs):**
- Request counts per endpoint
- Referrer headers (where people came from)
- Time-based traffic patterns
- No cookies, no JavaScript, no user IDs

**Minimal JavaScript (optional):**
- Plausible Analytics — privacy-focused, no personal data
- Umami — self-hosted, anonymous
- Cloudflare Web Analytics — cookie-free, no fingerprinting

**What we DON'T collect:**
- No Google Analytics (tracks across sites)
- No Facebook Pixel (surveillance)
- No user sessions/behavior tracking
- No personal identifiers

**What we CAN see:**
- Total visitors (anonymous count)
- Popular products
- Referrer sources (Reddit, Google, etc.)
- Conversion events (clicks to retailers)

**Affiliate tracking:**
- Click ID in URL parameters
- Cookie only for attribution (not tracking)
- No user profile building

---

## Growth & Marketing Strategy (Feb 18, 2026)

**Status:** Ready to push hard and fast — focus on MacTrackr over other projects
**Daily Planning:** Strategy talks each evening

### Content Marketing

**Article Publishing:** Drip them out, not all at once
- **2 articles/week** for SEO velocity
- Schedule: Monday + Thursday
- Promote each one (Twitter, relevant subreddits, forums)

**Blog Facelift:**
- Hero images for each post
- Comparison tables/infographics
- Price trend charts
- Clean typography, more whitespace

### Reddit Strategy (Organic)

**Core Principle:** Provide value first, never spam

**What to do:**
- r/apple — Answer "should I buy" questions
- r/mac — Comparisons, upgrade advice
- r/suggestalaptop — Mac recommendations when relevant
- Build karma, become trusted member
- **Comment with insight, link in profile**

**What NOT to do:**
- Never post links directly to MacTrackr
- Never copy/paste marketing text
- Never argue or be defensive

### Copying Concerns (YouTubers/Slickdeals)

**Valid worry:** They see it, they copy it.

**Mitigation:**
- **Speed** — Be first, iterate faster
- **Execution** — Your UX is cleaner
- **Privacy angle** — They can't easily copy "no tracking"
- **Data depth** — More products, better historical prices
- **Community** — Build email list, they can't steal that

**Decision:** Don't reach out to big players yet. Wait until:
- 1,000+ email subscribers
- Product is defensible
- You're top 3 in Google for major terms

### TikTok / Instagram / YouTube Shorts

**Strategy:** Cypherpunk / Acid Techno Vibes

**Visual Style:**
- Dark backgrounds (#0a0a0a)
- Neon accents (cyan #06b6d4, purple #8b5cf6)
- Glitch effects, digital noise
- Fast cuts, techno basslines
- 