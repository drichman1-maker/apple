#!/bin/bash
# add-model.sh - Quick add OpenRouter models to OpenClaw

CONFIG="$HOME/.openclaw/openclaw.json"

# Backup
cp "$CONFIG" "$CONFIG.backup"

case "$1" in
  "gemini-3.1-pro")
    jq '.models.providers.openrouter.models += [{
      "id": "google/gemini-2.5-pro-preview-03-25",
      "name": "Gemini 3.1 Pro Preview",
      "reasoning": false,
      "input": ["text","image"],
      "cost": {"input":2,"output":12,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 1000000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Gemini 3.1 Pro Preview"
    ;;
  
  "minimax-m2.1")
    jq '.models.providers.openrouter.models += [{
      "id": "minimax/minimax-m2.1",
      "name": "MiniMax M2.1",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":0.27,"output":0.95,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 200000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added MiniMax M2.1"
    ;;
  
  "phi-4")
    jq '.models.providers.openrouter.models += [{
      "id": "microsoft/phi-4",
      "name": "Phi-4",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":0.07,"output":0.14,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 16000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Phi-4"
    ;;
  
  "llama-3.3-70b")
    jq '.models.providers.openrouter.models += [{
      "id": "meta-llama/llama-3.3-70b-instruct",
      "name": "Llama 3.3 70B",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":0.2,"output":0.4,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 128000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Llama 3.3 70B"
    ;;
  
  "nova-pro")
    jq '.models.providers.openrouter.models += [{
      "id": "amazon/nova-pro-v1",
      "name": "Amazon Nova Pro",
      "reasoning": false,
      "input": ["text","image"],
      "cost": {"input":0.8,"output":3.2,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 300000,
      "maxTokens": 4096
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Amazon Nova Pro"
    ;;
  
  "qwen2.5-72b")
    jq '.models.providers.openrouter.models += [{
      "id": "qwen/qwen-2.5-72b-instruct",
      "name": "Qwen 2.5 72B",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":0.3,"output":0.6,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 128000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Qwen 2.5 72B"
    ;;
  
  "qwen3.5-plus")
    jq '.models.providers.openrouter.models += [{
      "id": "qwen/qwen-3.5-plus",
      "name": "Qwen 3.5 Plus",
      "reasoning": false,
      "input": ["text","image"],
      "cost": {"input":0.4,"output":2.4,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 128000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Qwen 3.5 Plus"
    ;;
  
  "pony-alpha")
    jq '.models.providers.openrouter.models += [{
      "id": "mancer/pony-alpha",
      "name": "Pony Alpha",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":0.0015,"output":0.0015,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 8192,
      "maxTokens": 4096
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Pony Alpha"
    ;;
  
  "deepseek-chat")
    jq '.models.providers.openrouter.models += [{
      "id": "deepseek/deepseek-chat",
      "name": "DeepSeek Chat",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":0.5,"output":0.8,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 64000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added DeepSeek Chat"
    ;;
  
  "deepseek-coder")
    jq '.models.providers.openrouter.models += [{
      "id": "deepseek/deepseek-coder",
      "name": "DeepSeek Coder",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":0.5,"output":0.8,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 64000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added DeepSeek Coder"
    ;;
  
  "deepseek-v3")
    jq '.models.providers.openrouter.models += [{
      "id": "deepseek/deepseek-v3",
      "name": "DeepSeek V3",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":0.5,"output":0.8,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 64000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added DeepSeek V3"
    ;;
  
  "mistral-large-2")
    jq '.models.providers.openrouter.models += [{
      "id": "mistralai/mistral-large-2",
      "name": "Mistral Large 2",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":2,"output":6,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 128000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Mistral Large 2"
    ;;
  
  "glm-4")
    jq '.models.providers.openrouter.models += [{
      "id": "thudm/glm-4",
      "name": "GLM-4",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":1,"output":2,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 128000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added GLM-4"
    ;;
  
  "command-r-plus")
    jq '.models.providers.openrouter.models += [{
      "id": "cohere/command-r-plus",
      "name": "Command R+",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input":3,"output":15,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 128000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Command R+"
    ;;
  
  "o3-mini")
    jq '.models.providers.openrouter.models += [{
      "id": "openai/o3-mini",
      "name": "o3-mini",
      "reasoning": true,
      "input": ["text"],
      "cost": {"input":1.1,"output":4.4,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 200000,
      "maxTokens": 100000
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added o3-mini"
    ;;
  
  "gemini-flash")
    jq '.models.providers.openrouter.models += [{
      "id": "google/gemini-2.0-flash-exp",
      "name": "Gemini 1.5 Flash",
      "reasoning": false,
      "input": ["text","image"],
      "cost": {"input":0.15,"output":0.6,"cacheRead":0,"cacheWrite":0},
      "contextWindow": 1000000,
      "maxTokens": 8192
    }]' "$CONFIG" > /tmp/oc.json && mv /tmp/oc.json "$CONFIG"
    echo "✅ Added Gemini 1.5 Flash"
    ;;
  
  "batch-1")
    echo "Adding batch 1: gemini-3.1-pro, minimax-m2.1, phi-4, llama-3.3-70b, nova-pro"
    $0 gemini-3.1-pro
    $0 minimax-m2.1
    $0 phi-4
    $0 llama-3.3-70b
    $0 nova-pro
    ;;
  
  "batch-2")
    echo "Adding batch 2: qwen2.5-72b, qwen3.5-plus, pony-alpha, deepseek-chat, deepseek-coder"
    $0 qwen2.5-72b
    $0 qwen3.5-plus
    $0 pony-alpha
    $0 deepseek-chat
    $0 deepseek-coder
    ;;
  
  "batch-3")
    echo "Adding batch 3: deepseek-v3, mistral-large-2, glm-4, command-r-plus, o3-mini, gemini-flash"
    $0 deepseek-v3
    $0 mistral-large-2
    $0 glm-4
    $0 command-r-plus
    $0 o3-mini
    $0 gemini-flash
    ;;
  
  "all")
    echo "Adding all models..."
    $0 batch-1
    $0 batch-2
    $0 batch-3
    echo "✅ All models added!"
    ;;
  
  *)
    echo "Usage: ./add-model.sh [model-name]"
    echo ""
    echo "Batch commands:"
    echo "  batch-1    - Gemini 3.1 Pro, MiniMax M2.1, Phi-4, Llama 3.3 70B, Nova Pro"
    echo "  batch-2    - Qwen 2.5 72B, Qwen 3.5 Plus, Pony Alpha, DeepSeek Chat/Coder"
    echo "  batch-3    - DeepSeek V3, Mistral Large 2, GLM-4, Command R+, o3-mini, Gemini Flash"
    echo "  all        - Add all models"
    echo ""
    echo "Individual models:"
    echo "  gemini-3.1-pro, minimax-m2.1, phi-4, llama-3.3-70b, nova-pro"
    echo "  qwen2.5-72b, qwen3.5-plus, pony-alpha"
    echo "  deepseek-chat, deepseek-coder, deepseek-v3"
    echo "  mistral-large-2, glm-4, command-r-plus, o3-mini, gemini-flash"
    ;;
esac
