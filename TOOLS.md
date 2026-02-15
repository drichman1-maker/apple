# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

## Model Strategy

**Main session:** Groq Llama 3.3 70B SpecDec (paid tier) — fast, reliable for text
**Fallbacks:** 
1. OpenRouter Claude Sonnet ($3/$15) — handles PDFs/images automatically
2. Direct Anthropic Claude Sonnet — backup if OpenRouter fails

**Subagents:** 16 concurrent workers (increased from 8 for heavy parallelization)

### Default Subagent Model
**DeepSeek via OpenRouter** ($0.14 in / $0.28 out)
- Excellent for coding, refactoring, data processing
- Cheap enough to run 10+ in parallel without worry
- Good reasoning, reliable structured output

---

## 🎯 Delegation Cheatsheet

### When to Spawn Subagents

**✅ Good candidates for delegation:**
- Independent research tasks (5 topics → 5 parallel subagents)
- Code reviews, refactoring, testing plans
- Content generation (blog posts, docs, marketing copy)
- Data processing and analysis
- Background monitoring/alerts

**❌ Keep in main session:**
- Tasks requiring back-and-forth conversation
- Decisions needing your immediate input
- Complex coordination requiring full context
- Quick one-off questions

---

## 📋 Model Selection by Task Type

### 💻 Coding & Development
**Model:** `openrouter/deepseek/deepseek-chat` ($0.14/$0.28)

**Use for:**
- Code reviews and refactoring
- Bug fixing and debugging
- Test suite generation
- API integration code
- Documentation generation

**Example:**
```bash
/spawn task="Review this React component for performance issues and suggest optimizations" model=openrouter/deepseek/deepseek-chat
```

---

### 🎨 Creative & Marketing
**Model:** `openrouter/x-ai/grok-2-1212` ($2/$10)

**Use for:**
- Marketing copy and taglines
- Brand voice content
- Creative storytelling
- Personality-driven writing
- Social media content

**Example:**
```bash
/spawn task="Write 5 witty Instagram captions for a meditation app launch" model=openrouter/x-ai/grok-2-1212
```

---

### ⚡ Fast Chat & Summaries
**Model:** `groq/llama-3.3-70b-specdec` (paid tier)

**Use for:**
- Quick summaries
- Fast Q&A
- Simple formatting
- Straightforward chat responses

**Example:**
```bash
/spawn task="Summarize this 50-page PDF into 3 key takeaways" model=groq/llama-3.3-70b-specdec
```

**Note:** You're paying for Groq, so use it when speed matters more than sophistication.

---

### 📊 Data Processing & Analysis
**Model:** `openrouter/deepseek/deepseek-chat` ($0.14/$0.28)

**Use for:**
- CSV/JSON parsing and transformation
- Data extraction from documents
- Simple statistical analysis
- Structured output generation

**Example:**
```bash
/spawn task="Extract all user emails from this CSV and format as JSON" model=openrouter/deepseek/deepseek-chat
```

---

### 🔬 Research & Investigation
**Model:** `openrouter/deepseek/deepseek-chat` ($0.14/$0.28)

**Use for:**
- Web research on specific topics
- Competitive analysis
- Technical documentation review
- Fact-checking and verification

**Example (parallel research fan-out):**
```bash
# Spawn 5 subagents to research different competitors in parallel
/spawn task="Research competitor A's pricing model" model=openrouter/deepseek/deepseek-chat
/spawn task="Research competitor B's feature set" model=openrouter/deepseek/deepseek-chat
/spawn task="Research competitor C's marketing strategy" model=openrouter/deepseek/deepseek-chat
/spawn task="Research competitor D's user reviews" model=openrouter/deepseek/deepseek-chat
/spawn task="Research competitor E's tech stack" model=openrouter/deepseek/deepseek-chat
```

---

## 🔧 Subagent Management

**List active workers:**
```bash
/subagents
```

**Stop a subagent:**
```bash
/subagents stop <session-id>
```

**Check subagent logs:**
```bash
/subagents log <session-id>
```

**Send message to running subagent:**
```bash
/subagents send <session-id> "Additional context or instruction"
```

---

## 💰 Cost Optimization Rules

1. **Scope tasks tightly** — fewer iterations = fewer tokens
2. **Monitor actively** — kill unused subagents with `/subagents`
3. **Batch similar work** — spawn overhead exists for tiny tasks
4. **Use cheapest model that works** — DeepSeek for most things, Grok 2 only when personality matters
5. **Parallelize independent work** — don't wait sequentially for tasks that can run together

---

## 🚀 Parallelization Patterns

### Pattern: Content Generation Batch
```bash
# All run simultaneously
/spawn task="Write blog post intro for LowkeyMode" model=openrouter/x-ai/grok-2-1212
/spawn task="Write 3 tweet variants about our launch" model=openrouter/x-ai/grok-2-1212
/spawn task="Draft welcome email for new users" model=openrouter/x-ai/grok-2-1212
```

### Pattern: Development Workflow
```bash
# All run in parallel
/spawn task="Review authentication code for security issues" model=openrouter/deepseek/deepseek-chat
/spawn task="Write unit tests for user registration flow" model=openrouter/deepseek/deepseek-chat
/spawn task="Document API endpoints for mobile team" model=openrouter/deepseek/deepseek-chat
```

### Pattern: Research Fan-Out
```bash
# 5 independent research streams
/spawn task="Research iOS meditation app best practices" model=openrouter/deepseek/deepseek-chat
/spawn task="Research privacy-first referral systems" model=openrouter/deepseek/deepseek-chat
/spawn task="Research Telegram bot integration patterns" model=openrouter/deepseek/deepseek-chat
/spawn task="Research subscription pricing psychology" model=openrouter/deepseek/deepseek-chat
/spawn task="Research community engagement tactics" model=openrouter/deepseek/deepseek-chat
```

---

## 📊 Model Comparison Quick Ref

| Model | Cost (in/out) | Best For | Speed | Notes |
|-------|---------------|----------|-------|-------|
| Claude Sonnet | $3/$15 | Main coordination | Fast | Your primary model |
| DeepSeek | $0.14/$0.28 | Coding, research | Fast | Default subagent |
| Grok 2 | $2/$10 | Creative, personality | Fast | Use sparingly |
| Groq Llama | Paid tier | Fast summaries | Very Fast | You're paying anyway |

---

**Remember:** Main session (Claude) coordinates. Subagents (DeepSeek default) do the heavy lifting. Override model for specific needs.

---

Add whatever helps you do your job. This is your cheat sheet.
