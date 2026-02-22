

### Additional Models (Feb 20, 2026)

| Model ID | Cost (in/out) | Context | Best For |
|----------|---------------|---------|----------|
| `openrouter/deepseek/deepseek-chat` | $0.50/$0.80 | 64K | General chat, reasoning |
| `openrouter/deepseek/deepseek-coder` | $0.50/$0.80 | 64K | Code generation, debugging |
| `openrouter/deepseek/deepseek-v3` | $0.50/$0.80 | 64K | General purpose, cheap |
| `openrouter/mistralai/mistral-large-2` | $2/$6 | 128K | European, compliance, reasoning |
| `openrouter/thudm/glm-4` | ~$1/$2 | 128K | Bilingual, Chinese/English research |
| `openrouter/cohere/command-r-plus` | $3/$15 | 128K | RAG, document search, enterprise |
| `openrouter/openai/o3-mini` | $1.10/$4.40 | 200K | Reasoning tasks, math, coding |
| `openrouter/google/gemini-1.5-flash` | $0.15/$0.60 | 1M | Fast vision, quick tasks |
| `openrouter/moonshotai/kimi-k2.5` | $0.50/$2.80 | 2M | Long context, main session |
| `openrouter/minimax/minimax-m2.1` | $0.27/$0.95 | 200K | Subagent default, cheap |
| `openrouter/minimax/minimax-m2.5` | $0.20/$0.60 | 128K | Main session primary |
| `openrouter/microsoft/phi-4` | $0.07/$0.14 | 16K | Ultra-cheap bulk tasks |
| `openrouter/meta-llama/llama-3.3-70b` | $0.20/$0.40 | 128K | European, open source |
| `openrouter/amazon/nova-pro` | $0.80/$3.20 | 300K | AWS, multimodal |
| `openrouter/qwen/qwen-2.5-72b` | $0.30/$0.60 | 128K | Coding tasks |
| `openrouter/qwen/qwen-3.5-plus` | $0.40/$2.40 | 128K | Vision + video |
| `openrouter/mancer/pony-alpha` | FREE | 8K | Uncensored |
| `openrouter/anthropic/claude-sonnet-4-6` | $3/$15 | 200K | Complex reasoning, audits |

### Updated Model Selection Matrix

| Task Type | Primary | Fallback | Budget |
|-----------|---------|----------|--------|
| **Main Session** | MiniMax-M2.5 | Kimi K2.5 | MiniMax-M2.1 |
| **Code/Review** | Claude Sonnet 4.6 | MiniMax-M2.1 | DeepSeek-Coder |
| **Subagent Default** | MiniMax-M2.1 | MiniMax-01 | Phi-4 |
| **Long Context** | Kimi K2.5 (2M) | Gemini 3.1 Pro (1M) | Gemini Flash (1M) |
| **Creative/Marketing** | Claude Sonnet | Amazon Nova Pro | Llama 3.3 70B |
| **Vision/Images** | Gemini 3.1 Pro | Qwen3.5 Plus | Gemini Flash |
| **Audit/Debug** | Claude Sonnet 4.6 | Gemini 3.1 Pro | o3-mini |
| **Bulk/Quick** | Phi-4 | MiniMax-01 | Gemini Flash |
| **Uncensored** | Pony Alpha | — | — |
| **RAG/Search** | Command R+ | Mistral Large 2 | — |
| **Bilingual** | GLM-4 | Qwen models | — |
| **Reasoning** | o3-mini | DeepSeek-V3 | — |
| **European/Compliance** | Mistral Large 2 | — | — |

### Fallback Configuration

Add to `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "openrouter/minimax/minimax-m2.5",
        "fallbacks": [
          "openrouter/moonshotai/kimi-k2.5",
          "openrouter/minimax/minimax-m2.1",
          "openrouter/microsoft/phi-4",
          "openrouter/google/gemini-2.0-flash-exp"
        ]
      },
      "subagents": {
        "model": "openrouter/minimax/minimax-m2.1"
      }
    }
  }
}
```

**Fallback Priority:**
1. **MiniMax-M2.5** — Primary, fast, cheap ($0.20/$0.60)
2. **Kimi K2.5** — Long context (2M tokens)
3. **MiniMax-M2.1** — Subagent default ($0.27/$0.95)
4. **Phi-4** — Ultra-cheap backup ($0.07/$0.14)
5. **Gemini Flash** — Fast vision, 1M context ($0.15/$0.60)

---
Updated: Feb 20, 2026
