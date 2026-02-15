# MEMORY.md — Long-Term Memory

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
