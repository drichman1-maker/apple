#!/bin/bash
# Deploy Telegram Bot

cd ~/.openclaw/workspace/telegram-bot

# Create virtual environment
python3 -m venv venv

# Activate
source venv/bin/activate

# Install dependencies
pip install python-telegram-bot python-dotenv

# Run bot
python bot.py
