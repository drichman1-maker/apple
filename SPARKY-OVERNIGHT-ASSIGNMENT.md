# SPARKY OVERNIGHT ASSIGNMENT
## February 16-17, 2026 | Autonomous M4 Work

---

## MISSION
Generate revenue and value overnight while human team sleeps. Operate within $5 API budget. Report results by 8:00 AM.

---

## BUDGET
- **API Allowance**: $2.00 max (revised down from $5)
- **Time**: 6 hours (skip overnight - human not awake)
- **Goal**: Generate $20+ in value or actionable opportunities

---

## PRIORITY 1: Price Monitoring & Alerts (40% of budget)

### Task: Continuous Price Scraping
**What to do:**
1. Every 3 hours (skip 12am-6am), check prices on tracked products:
   - MacBook Pro M4 Max (all configs)
   - iPhone 16 Pro Max
   - iPad Pro M4
   - PS5 Console
   - Nintendo Switch 2 (when available)

2. Compare against historical lows
3. If price drops >10% or hits all-time low:
   - Log the deal
   - Draft Telegram alert message
   - Calculate arbitrage potential

**Value:** $20-50 per significant find
**Cost:** ~$0.60 (DeepSeek subagents, revised)
**Success metric:** 1+ actionable deal found

---

## PRIORITY 2: Arbitrage Detection (30% of budget)

### Task: Cross-Platform Price Comparison
**What to do:**
1. Check these product categories:
   - Graded comics (CGC 9.8+)
   - Pokémon cards (PSA 10)
   - Retro video games (CIB)
   - Electronics (MacBooks, iPhones)

2. Compare prices across:
   - eBay sold listings
   - Amazon prices
   - Specialty sites (Heritage, ComicLink, etc.)

3. If price spread >20%:
   - Log arbitrage opportunity
   - Calculate profit after fees
   - Flag for morning review

**Value:** $100-500 per arbitrage flip
**Cost:** ~$1.00 (DeepSeek subagents)
**Success metric:** 1+ arbitrage opportunity found

---

## PRIORITY 3: Content Generation (20% of budget)

### Task: SEO Article Drafts
**What to do:**
1. Draft 2-3 short articles (500-800 words):
   - "Best Time to Buy [Product]"
   - "[Product] Price History & Trends"
   - "Where to Find [Product] Deals"

2. Use existing data from scrapers
3. Format for web deployment
4. Save to `/articles/drafts/`

**Value:** $30-60 per article (traffic value)
**Cost:** ~$0.50 (DeepSeek)
**Success metric:** 2+ drafts ready for review

---

## PRIORITY 4: Infrastructure Monitoring (10% of budget)

### Task: System Health Checks
**What to do:**
1. Every 3 hours (during waking hours only), check:
   - MacTrackr backend: /api/health
   - All deployed sites: HTTP 200 check
   - Telegram bot: /start command test

2. If any service down:
   - Log incident with timestamp
   - Attempt basic restart (if configured)
   - Alert human team if critical

**Value:** Prevent revenue loss from downtime
**Cost:** ~$0.10 (minimal API calls, revised)
**Success metric:** All services monitored

---

## FORBIDDEN (Don't Do These)

❌ Spend >$5 API budget
❌ Delete any files without backup
❌ Send emails/messages to external parties
❌ Make purchases or financial transactions
❌ Modify production databases directly
❌ Deploy code without human review
❌ Use Opus/expensive models
❌ Work >10 hours (rest at 8 AM)

---

## REPORTING

### Daily Report (6:00 PM)
Send summary to Doug with:

```
SPARKY OVERNIGHT REPORT
Date: 2026-02-17
Budget Used: $X.XX / $5.00

DEALS FOUND:
- [Product]: $XXX (X% drop) → [Link]

ARBITRAGE OPPORTUNITIES:
- [Product]: Buy $XXX → Sell $XXX → Profit $XX

CONTENT CREATED:
- [Article 1 title] → /articles/drafts/...
- [Article 2 title] → /articles/drafts/...

SYSTEM STATUS:
- MacTrackr backend: [UP/DOWN]
- [Site 1]: [UP/DOWN]
- [Site 2]: [UP/DOWN]

RECOMMENDATIONS:
- [Action item 1]
- [Action item 2]
```

---

## TOOLS AVAILABLE

**Models:**
- DeepSeek ($0.14/$0.28) — default for all tasks
- Groq Llama (paid tier) — fast summaries only
- Ollama local — free for simple tasks

**APIs:**
- Price scrapers (existing)
- Web search (Brave)
- Telegram bot (read-only)

**Storage:**
- Local workspace files
- Git commits (document only)

---

## SUCCESS CRITERIA

✅ Stay under $5 budget
✅ Find 1+ actionable deal
✅ Monitor all services
✅ Report by 8:00 AM
✅ No critical errors

**Bonus:**
🌟 Find arbitrage opportunity >$100 profit
🌟 Draft 3+ articles
🌟 Identify trend/insight human missed

---

*Budget wisely. Work efficiently. Report clearly.*
*See you at 8:00 AM.*
