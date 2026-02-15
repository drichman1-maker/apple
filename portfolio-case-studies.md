# CodeMode Case Studies

## MacTrackr — Apple Product Intelligence

**The Challenge**
Apple products have volatile pricing across retailers. Users need real-time tracking of deals, trade-in values, and stock availability across multiple sources.

**The Solution**
Built a full-stack aggregator with:
- **Turborepo** architecture for shared components between web and iOS
- **FastAPI backend** with PostgreSQL for price history and alerts
- **iOS app** for push notifications on price drops
- **Web dashboard** for browsing deals and comparison tables

**Key Features**
- Live price tracking from 6+ retailers
- Titanium/natural/black color variants for iPhone 16 Pro
- Trade-in calculator with depreciation curves
- Price alert system via email + push

**Tech Stack:** TypeScript, React, FastAPI, PostgreSQL, Swift

---

## Health Index — Wellness Machine Aggregator

**The Challenge**
High-ticket wellness equipment (saunas, red light therapy, massage guns) has fragmented pricing. Buyers struggle to compare specs, warranties, and real user reviews across brands.

**The Solution**
Built a specialized aggregator focused on medical/wellness trust:
- **Schema markup** for product specs (wavelengths, dimensions, certifications)
- **Comparison engine** for side-by-side feature analysis
- **Affiliate integration** with Clearlight, Sunlighten, SaunaSpace
- **Content hub** with buying guides and wellness research

**Key Features**
- Filter by condition (pain relief, recovery, sleep)
- ROI calculator for home vs. clinic use
- Vendor trust scores based on warranty + customer service
- SEO-optimized content driving organic traffic

**Tech Stack:** Next.js, PostgreSQL, Tailwind CSS

---

## DiamondData — Baseball Card Intelligence

**The Challenge**
Sports card collectors need real-time price data from multiple marketplaces (COMC, eBay, auction houses) plus grading information from PSA/BGS.

**The Solution**
Built a focused aggregator with vintage aesthetics:
- **Amber/orange color system** evoking classic card borders
- **Player cards** with career stats and price history charts
- **Grading integration** showing PSA/BGS pop reports
- **Auction alerts** for ending-soon listings

**Key Features**
- Mantle, Ruth, Aaron, Griffey, Trout, Jeter profiles live
- Price trend visualization (30/90/365 day)
- Set completion tracker
- Portfolio value calculator

**Tech Stack:** React, Vercel, REST APIs, Chart.js

---

## MintCondition — Pokémon TCG Tracker

**The Challenge**
Pokémon card prices fluctuate wildly with set releases, meta shifts, and influencer hype. Collectors need real-time data on rarity, condition, and market trends.

**The Solution**
Built a TCG-focused price tracker:
- **Rarity badges** (Common → Secret Rare) with visual hierarchy
- **Set browsers** with completion percentages
- **Condition grading** integration (PSA, BGS, CGC)
- **Market alerts** for price spikes and new high-rarity listings

**Key Features**
- TCGplayer and Cardmarket price aggregation
- Set release calendar with pre-order tracking
- Portfolio management with value history
- Shadowless vs. Unlimited variant tracking

**Tech Stack:** React, Cloudflare Pages, FastAPI backend (in progress)

---

## Rumble — Video Game Deal Hunter

**The Challenge**
Game deals are scattered across Steam, PlayStation Store, Xbox Store, and retailers. Users miss limited-time sales and bundle opportunities.

**The Solution**
Building a comprehensive game deal aggregator:
- **Multi-platform tracking** (PC, PlayStation, Xbox, Switch)
- **Bundle detection** for DLC and season passes
- **Historical price data** to identify real vs. fake sales
- **Restock alerts** for limited editions

**Key Features**
- Steam wishlist import
- Platform comparison (digital vs. physical)
- Deal expiration countdowns
- Affiliate links for Razer, GameStop, Amazon

**Tech Stack:** FastAPI, PostgreSQL, React (in development)

---

# BaselineDesigns Case Studies

## MacTrackr — Apple-Inspired Minimalism

**Design Challenge**
Create a UI that feels native to Apple users while presenting complex price data clearly.

**Design Decisions**
- **Color system:** Titanium, Natural, Black, Silver matching iPhone 16 Pro variants
- **Typography:** SF Pro-inspired stack for Apple-native feel
- **Layout:** Clean product grids with hover states revealing specs
- **Trust signals:** Official retailer badges, SSL indicators, last-updated timestamps

**Results**
- Users report "feels like an Apple website"
- 40% lower bounce rate vs. competitor sites
- High engagement on comparison tables

---

## Health Index — Medical Trust & Clarity

**Design Challenge**
Build credibility for high-ticket wellness purchases ($500-$5000+) without feeling clinical or sterile.

**Design Decisions**
- **Color palette:** Calming blues and greens (trust + wellness)
- **Information hierarchy:** Specs front-and-center, marketing copy secondary
- **Comparison UI:** Side-by-side tables with highlight on differences
- **Certification badges:** FDA clearance, third-party testing prominently displayed

**Results**
- 25% higher time-on-page vs. category average
- Strong affiliate conversion rates
- Users cite "easy to compare" as primary satisfaction driver

---

## DiamondData — Vintage Meets Modern

**Design Challenge**
Honor baseball card nostalgia while delivering modern data visualization.

**Design Decisions**
- **Color system:** Amber/orange inspired by classic Topps borders
- **Card displays:** High-res images with condition close-ups
- **Data viz:** Price charts styled to look like card back stats
- **Typography:** Serif headers (vintage) + Sans-serif data (modern)

**Results**
- 60+ year-old collectors praise the "authentic feel"
- Younger users engage with price trend features
- Strong social sharing of player profile pages

---

## MintCondition — TCG Collector Focus

**Design Challenge**
Serve both casual players and serious collectors with different information needs.

**Design Decisions**
- **Rarity badges:** Visual system from Common (gray) to Secret Rare (gold rainbow)
- **Card displays:** Front/back toggle with zoom on holo patterns
- **Set navigation:** Visual grid of set symbols for quick browsing
- **Portfolio view:** At-a-glance value summary + detailed collection breakdown

**Results**
- Collectors use portfolio feature daily
- Set completion gamification drives return visits
- Price alert emails have 35% open rate

---

## TaskBidder — Reverse Marketplace UX *(Coming Soon)*

**Design Challenge**
Flip the traditional service marketplace: customers post jobs, providers bid.

**Design Decisions (Planned)**
- **Job posting flow:** Minimal friction, smart defaults for common tasks
- **Bid comparison:** Side-by-side provider offers with ratings/credentials
- **Trust layer:** Insurance verification, review systems, milestone payments
- **Mobile-first:** Most users will post jobs from phones

**Target Launch:** Q2 2026
