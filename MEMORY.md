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

---

## GitHub Repositories — COMPLETE AUDIT (Feb 16, 2026)

### Main Projects

| Workspace Folder | Repo Name | GitHub URL | Status | Deploy Target |
|-----------------|-----------|------------|--------|---------------|
| **healthindex-prod/** | Med-device | https://github.com/drichman1-maker/Med-device | ✅ Connected | healthindex.com |
| **mactrackr-frontend/** | apple | https://github.com/drichman1-maker/apple | ✅ NOW CONNECTED | mactrackr.com |
| **mactrackr-backend/** | (NONE) | Need to create | 🔴 No repo | Render |
| **LowKeyMode/** | soundcheck | https://github.com/drichman1-maker/soundcheck | ✅ Connected | App Store |
| **baselinedesigns/** | baselinedesigns | https://github.com/drichman1-maker/baselinedesigns | ✅ Connected | baselinedesigns.com |
| **codemode/** | codemode | https://github.com/drichman1-maker/codemode | ✅ Connected | codemodeapps.com |

### Aggregator Projects

| Workspace Folder | Repo Name | GitHub URL | Notes |
|-----------------|-----------|------------|-------|
| **appliances-codemode/** | appliance-scout | https://github.com/drichman1-maker/appliance-scout | Appliances |
| **autoparts-codemode/** | auto | https://github.com/drichman1-maker/auto | Auto parts |
| **babygear-codemode/** | gear | https://github.com/drichman1-maker/gear | Baby gear |
| **coin-agg/** | coin-agg | https://github.com/drichman1-maker/coin-agg | Coins |
| **coincurator-codemode/** | coin-agg | https://github.com/drichman1-maker/coin-agg | ⚠️ Same repo as coin-agg |
| **comics-mintcondition/** | grailwatch | https://github.com/drichman1-maker/grailwatch | Comics |
| **fixed-income-codemode/** | fixed-income-agg | https://github.com/drichman1-maker/fixed-income-agg | Fixed income |
| **mintcondition-pokemon/** | pokemon-agg | https://github.com/drichman1-maker/pokemon-agg | Pokémon |
| **rumbledeals-codemode/** | videogames | https://github.com/drichman1-maker/videogames | Video games |
| **taskbidder-codemode/** | handymanpaint | https://github.com/drichman1-maker/handymanpaint | Task bidder |
| **terminal/** | terminal | https://github.com/drichman1-maker/terminal | Terminal UI |
| **videogames-agg/** | video-game-agg | https://github.com/drichman1-maker/video-game-agg | ⚠️ Similar to videogames |
| **watches-codemode/** | timepie | https://github.com/drichman1-maker/timepie | Watches |
| **wine-codemode/** | alch | https://github.com/drichman1-maker/alch | Wine |

### GitHub Org
**User:** drichman1-maker (https://github.com/drichman1-maker)

### Missing Repos (Need Creation)
1. mactrackr-frontend → React + Vite app
2. mactrackr-backend → Node/Express API
3. healthindex-frontend → Next.js (old version)
4. Any consolidated "codemodeapps" mono-repo
| **RetroRefine** | retrorefine.codemodeapps.com | 🟡 Subdomain | Video games |
| **Pokémon** | pokemon.mintcondition.com | 🟡 Subdomain | Need build |
| **Watches** | watches.codemodeapps.com | 🔴 Not started | Need DNS |
| **Wine** | wine.codemodeapps.com | 🔴 Not started | Need DNS |
| **Auto Parts** | autoparts.codemodeapps.com | 🔴 Not started | Need DNS |
| **LowKeyMode** | lowkeymode.app (planned) | 🟡 Building | iOS + web |

**DNS Pattern:** All subdomains → CNAME → cname.vercel-dns.com

---

## About Doug
- Prefers brevity, values token efficiency
- Cost-conscious with API usage — runs Ollama locally, uses Haiku for subagents
- Uses Twin.so for automation
- Interested in multi-provider setup (Groq, OpenRouter, xAI, Moonshot)
- Telegram user (id: 461595428, @cloves222)

## OpenClaw Setup
- Installed 2026-02-06, MacBook Air ARM
- Anthropic API key configured
- Ollama running locally (qwen3:8b, qwen3-vl:8b)
- Model chain: Ollama/qwen3:8b (primary) → Haiku → Sonnet → Opus (fallbacks)
- Subagents: Haiku by default

## Doug's Projects
- **Low Key Mode** — meditation, sound measurement, community app
- **Health Index** — website aggregating wellness machines, affiliate programs
- **Aggregator apps** — planning more iOS/web aggregator applications
- **Reverse marketplaces** — planning/building reverse marketplace concepts

## Key Decisions
- 2026-02-07: Confirmed OAuth from Claude Pro/Max doesn't replace API credits for OpenClaw
- 2026-02-07: Set up model fallback chain for cost optimization
- 2026-02-08: Request to track and notify when Claude is used (for API credit monitoring)
- 2026-02-08: Final model strategy — Groq Llama SpecDec (paid tier) as primary for text, auto-fallback to Claude for PDFs/images; 16 subagents using DeepSeek ($0.14/$0.28) for coding/routine work, Grok 2 for creative tasks; avoid free tiers (hit limits)

## 2026-02-15 — Overnight Work

### Progress
- **MacTrackr backend** — FIXED and live (env vars resolved)
- **Twitter handles claimed:** @lowkeymodeapp, @healthindexHQ, @mactrackrapp
- **BaselineDesigns & CodeMode** — CSS fixes deployed (mobile spacing, whitespace)

### Blockers Cleared
- MacTrackr backend crash — RESOLVED
- eBay API — Still waiting for exemption response

### Morning Priorities
- LowKeyMode Xcode shipping (9 AM)
- Affiliate applications (Amazon, ShareASale, Best Buy)
- eBay API exemption follow-up

---

## 2026-02-13 — Today's Session

### Progress
- **MacTrackr backend** deployed to Render (Free tier) — needs env vars fix (status 3 crash)
- **Domains secured:** sluggerdata.com, codemodeapps.com
- **eBay API** support ticket submitted (awaiting 24-48h response for exemption)
- **Investor calls** completed — potential funding/better hardware
- **Side hustle research** completed via subagent — top 3: Micro-SaaS, Service Arbitrage, Digital Products
- **SEO content** drafted (10 articles ready for MacTrackr + HealthIndex)
- **Schedule revised** due to investor calls taking priority

### Pipeline
- **Tonight:** Xcode shipping (LowKeyMode priority), backend fix, social handles
- **Saturday:** Shared backend architecture, migrate scrapers (Rumble, MintCondition)
- **Sunday:** Frontend updates, domain connections, SEO content publishing

### Blockers
- MacTrackr backend crashed (missing DATABASE_URL or other env var)
- eBay API disabled — waiting for support response

### New Ideas
- **Price alert bots** — cron job monitoring with email notifications (backlog)
- **Prove-Up** — real estate marketplace, needs funding/resources (backlog)
- **Phase 2 verticals** — appliances, graded comics, watches, collectible books (backlog)

### Workflow Improvements Discussed
- Use subagents for parallel research while coding
- Batch similar tasks (domains, socials, affiliates)
- Keep daily notes in memory/YYYY-MM-DD.md
- Commands: /spawn, batch requests, documentation updates

---

## 2026-02-15 Evening — Major Progress

### Apps & Sites Shipped
- RetroRefine: Video game aggregator (web + iOS)
  - Retro/Modern mode switching
  - 11 retailer integrations
  - Price history + alerts
- PokeAggregator: Phase 1 complete
  - PSA/BGS/CGC/SGC grading integration
  - Arbitrage detection
  - Market pulse dashboard
- Hardware Intelligence: Apple price tracker
  - Real-time price velocity charts
  - Multi-retailer comparison
  - Push notifications for deals

### UI Design Library
- 30+ screenshots documented
- Consistent design system across apps:
  - Dark mode
  - Cyan/purple gradients
  - Card-based layouts
  - Price comparison tables

### Development Updates
- LowKeyMode: @Observable conversion started
- MacTrackr backend: Fixed env vars
- SEO Articles: 10 completed, ready for deployment

### Infrastructure
- Model strategy finalized:
  - Primary: Groq Llama SpecDec (paid tier)
  - Image/PDF: Claude auto-fallback
  - Subagents: DeepSeek via OpenRouter
- Parallel processing: 16 concurrent workers

### Tomorrow's Launch Plan
1. **8:30 AM:** LowKeyMode fresh Xcode project
2. **10:00 AM:** Telegram deal bot
3. **1:00 PM:** Deploy remaining aggregators
4. **3:00 PM:** Submit affiliate applications

### No-Repeat Rules
1. No circular debugging (30 min max per issue)
2. Ship over perfect
3. Parallel execution (Doug mobile, Henry web)
4. Daily standup at 8:30 AM
5. No scope creep

---

## 2026-02-16 — Economic Tracking Framework (ClawWork-Inspired)

### Philosophy
**Not about immediate profitability** — we're in investment/build phase. But we track efficiency and justify every dollar spent.

### Framework
- **Investment Phase**: Accept losses now for compounding returns later
- **Efficiency Tracking**: Measure output per dollar, not just dollars out
- **Justification**: Every task must have clear value proposition
- **Effectiveness**: Quality gates before considering work "done"

### Task Valuation Model
| Task Type | Cost (API) | Value Created | Efficiency |
|-----------|-----------|---------------|------------|
| iOS app building | $0.01-0.05 | $500-2000 (App Store potential) | 10,000x+ |
| Aggregator deployment | $0.01 | $100-500 (monthly revenue potential) | 5,000x+ |
| SEO article | $0.005 | $50-200 (traffic value) | 4,000x+ |
| Telegram bot | $0.02 | $1000+ (subscription revenue) | 5,000x+ |
| Research/subagents | $0.10-0.50 | Variable (decision quality) | High if actionable |
| Debug/fix cycles | $0.05-0.20 | Time saved (opportunity cost) | OK if <30 min |

### Cost-Conscious Rules
1. **Local first**: Ollama for quick tasks, API for complex work
2. **Right model for job**: DeepSeek ($0.14/$0.28) default, upgrade only when needed
3. **30-min rule**: If not solved in 30 min, escalate or pivot — no sunk cost
4. **Batch similar work**: Context switching wastes tokens
5. **Cache results**: Don't regenerate same content twice
6. **Use Xcode AI**: Built-in AI suggestions/fixes are free and effective (proven 2026-02-16)

### Tracking (Lightweight)
- Log major blocks (30-min units)
- End-of-day cost summary
- Weekly efficiency review
- Monthly profitability check (for fun, not stress)

### Acceptable Spend Profile
**Current**: $5-20/day in API costs
**Target**: <$10/day average by month 3
**Revenue goal**: $100/day by month 6
**Break-even**: Not expected until month 4-6

### Infrastructure Budget Strategy
**Monthly Cap**: $400-500 total
- API costs: ~$60-70 (revised estimate with cron jobs every 3hrs)
- Hosting (Vercel/Render): ~$50-100
- Domains/subdomains: ~$20-50
- Tools/services: ~$50-100
- Buffer: ~$200-250

**Sparky (M4) Budget**:
- Per session: $2.00 max
- Frequency: Every 3 hours, skip overnight (6am-10pm only)
- Focus: Price monitoring, arbitrage detection, content drafts

**Scaling Plan**:
- 10 custom domains already owned
- New apps: subdomains under codemodeapps.com (free)
- Free tiers first (Vercel hobby, Render free)
- Upgrade only when traffic justifies
- Better hardware investment postponed until MRR > $1K

**Cost Efficiency Tactics**:
- Subagents default to DeepSeek ($0.14/$0.28)
- Ollama for local quick tasks
- Claude only for PDFs/images
- Groq for fast text (already paying)
- Batch work to minimize context switching
