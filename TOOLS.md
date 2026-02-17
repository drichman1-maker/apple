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

**Main session:** MiniMax-M2 via OpenRouter — fast, code specialist, SWE-Bench leader
**Fallbacks:** 
1. OpenRouter Claude Sonnet ($3/$15) — handles PDFs/images automatically
2. Kimi K2.5 (2M context) — for long context tasks
3. Direct Anthropic Claude Sonnet — backup if OpenRouter fails

**Subagents:** 16 concurrent workers (increased from 8 for heavy parallelization)

### Default Subagent Model — CHANGED DUE TO FAILURES
**~~DeepSeek via OpenRouter~~** ❌ DISCARDED — Repeatedly gave wrong assessments, wasted tokens

**NEW DEFAULT: Claude 3.5 Haiku via OpenRouter** ($1/$5) 
- Faster than Sonnet, cheaper, still reliable
- Better file inspection and verification
- Use for: assessments, research, fact-checking

**Premium Subagent (critical tasks only):** Claude 3.5 Sonnet ($3/$15)
- Use for: code generation, complex debugging, final reviews
- Only when accuracy is worth the cost

### Alternative Models to Explore (Replace Groq/Ollama)

| Model | Provider | Cost (in/out) | Strengths | Best For |
|-------|----------|---------------|-----------|----------|
| **MiniMax-M1** | OpenRouter | $0.42/$1.93 | 1M context, MoE architecture, fast inference | Long docs, multi-file coding, agents |
| **MiniMax-M2** | OpenRouter | ~$0.50/$2.00 | Code generation, SWE-Bench leader, reasoning | Complex coding, debug loops |
| **GLM-4** (Zhipu) | OpenRouter | ~$1/$2 | 128K context, Chinese/English bilingual | Research, analysis, long-context tasks |
| **Qwen2.5-72B** | OpenRouter | $0.30/$0.60 | Strong coding, math, multilingual | Coding tasks, data processing |
| **Mistral Large** | OpenRouter | $2/$6 | European alternative, good reasoning | General tasks, compliance-sensitive work |
| **Command R+** | Cohere | $3/$15 | 128K context, RAG-optimized | Document analysis, search, citations |
| **Phi-4** (Microsoft) | OpenRouter | $0.07/$0.14 | Small (14B), efficient, surprisingly capable | Quick tasks, edge deployment |

**My Recommendations:**
1. **MiniMax-M1** — Replace Groq for fast text. 1M context, cheap, good for large codebases
2. **GLM-4** — Strong bilingual model, good for research and long docs
3. **Qwen2.5-72B** — Cheap coding alternative to DeepSeek, actually reliable
4. **Phi-4** — Ultra-cheap for simple tasks, replace Ollama local when you need API consistency

**Avoid:**
- ~~Groq free tier~~ — Hit limits constantly, unreliable
- ~~Ollama~~ — Local only, no API consistency, hardware-dependent
- ~~DeepSeek~~ — Proven unreliable for assessments

### Model Selection Rules (UPDATED 2026-02-16)
1. **Assessments/status checks** → Haiku (verify files, check state)
2. **Code generation/review** → Sonnet (reliable, fewer errors)
3. **Simple data processing** → Haiku or Phi-4 (structured output)
4. **Long context (100K+)** → MiniMax-M1, GLM-4, or Kimi
5. **NEVER DeepSeek/Groq for:** File system assessments, deployment status, project state
   - Failed 3x: reported skeleton when built, missed .vercel folders, bad priorities

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
**Model:** `openrouter/anthropic/claude-3.5-sonnet` ($3/$15) — UPDATED
- DeepSeek failed repeatedly on assessments, not worth the "savings"

**Use for:**
- Code reviews and refactoring
- Bug fixing and debugging
- Test suite generation
- API integration code
- Documentation generation

**Example:**
```bash
/spawn task="Review this React component for performance issues and suggest optimizations" model=openrouter/anthropic/claude-3.5-sonnet
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
**Model:** `openrouter/anthropic/claude-3.5-haiku` ($1/$5) — UPDATED

**Use for:**
- CSV/JSON parsing and transformation
- Data extraction from documents
- Simple statistical analysis
- Structured output generation

**Example:**
```bash
/spawn task="Extract all user emails from this CSV and format as JSON" model=openrouter/anthropic/claude-3.5-haiku
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

**Remember:** Main session (Kimi K2.5) coordinates. Subagents (Haiku default, MiniMax-M1 for long context) do the heavy lifting. Override model for specific needs.

### Active Model Stack (Feb 16, 2026)

| Tier | Models | Use Case |
|------|--------|----------|
| **Main** | MiniMax-M2, Kimi K2.5, Claude Sonnet | Coordination, complex decisions |
| **Subagent Default** | Claude Haiku | Assessments, quick tasks |
| **Long Context** | MiniMax-M1, GLM-4 | Codebase analysis, research |
| **Code** | MiniMax-M2, Claude Sonnet | Generation, debugging |
| **Fast/Cheap** | Phi-4, Haiku | Data processing, simple tasks |
| **Creative** | Grok 2 | Marketing, copywriting |
| **Uncensored** | Pony Alpha | Raw output, unrestricted |
| **AWS/Amazon** | Amazon Spark (Nova) | AWS ecosystem, Bedrock integration |

### Quick Model Selection (NEW)

| Task | First Choice | Backup | Avoid |
|------|--------------|--------|-------|
| File assessment | Haiku | Sonnet | DeepSeek |
| Code generation | MiniMax-M2 | Sonnet | DeepSeek |
| Long context (100K+) | MiniMax-M1 | GLM-4 | Groq |
| Quick/cheap tasks | Phi-4 | Haiku | Ollama |
| Research | GLM-4 | MiniMax-M1 | DeepSeek |
| Creative copy | Grok 2 | Sonnet | — |
| Uncensored/raw | Pony Alpha | — | — |
| AWS/Bedrock | Amazon Spark (Nova) | — | — |

### Extended Model Portfolio (Recommended to Add)

| Model | Provider | Cost (in/out) | Best For | Priority |
|-------|----------|---------------|----------|----------|
| **MiniMax-M2** | OpenRouter | ~$0.50/$2.00 | SWE-Bench leader, complex code | ✅ Added |
| **MiniMax-M1** | OpenRouter | $0.42/$1.93 | 1M context, agents, coding | 🔥 ADD NOW |
| **GLM-4** (Zhipu) | OpenRouter | ~$1/$2 | 128K context, bilingual research | 🔥 ADD NOW |
| **Amazon Nova Pro** | AWS Bedrock | ~$0.80/$3.20 | AWS ecosystem, Sparky integration | ✅ Added |
| **Qwen2.5-72B** | OpenRouter | $0.30/$0.60 | Coding, math, multilingual | Medium |
| **Pony Alpha** | OpenRouter | TBD | Uncensored, raw output | Medium |
| **Kimi K2.5** | OpenRouter | TBD | 2M context (current main) | ✅ Already using |
| **Mistral Large 2** | OpenRouter | $2/$6 | European, compliance, reasoning | Low |
| **Command R+** | Cohere | $3/$15 | 128K, RAG, document search | Low |
| **Llama 3.3 70B** | OpenRouter | ~$0.20/$0.40 | Meta model, good balance | Consider |

### Model Categories

**High Context (100K+ tokens):**
- MiniMax-M1 (1M) — Best for codebase ingestion
- GLM-4 (128K) — Research, bilingual
- Kimi K2.5 (2M) — Massive context
- Command R+ (128K) — RAG-optimized

**Code Specialists:**
- Claude 3.5 Sonnet — Most reliable
- MiniMax-M2 — SWE-Bench leader
- Qwen2.5-72B — Cheap, good
- o1/o3-mini — Reasoning (if needed)

**Fast & Cheap:**
- Phi-4 ($0.07/$0.14) — Quick tasks
- Haiku ($1/$5) — Default subagent
- Llama 3.3 70B — Balanced

**Specialized:**
- Grok 2 — Personality/creative
- Pony Alpha — Uncensored/raw
- Amazon Nova (Spark) — AWS/Bedrock, fast
- Gemini Pro — Video analysis

---

Add whatever helps you do your job. This is your cheat sheet.
