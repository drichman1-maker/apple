import os
import asyncio
import logging
from datetime import datetime
from telegram import Bot, Update
from telegram.ext import Application, CommandHandler, ContextTypes
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Get config from env
BOT_TOKEN = os.getenv('DEAL_BOT_TOKEN')
FREE_CHANNEL_ID = os.getenv('FREE_CHANNEL_ID', '@dealsalerting')

class DealBot:
    def __init__(self):
        self.bot = Bot(token=BOT_TOKEN)
        
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Welcome message"""
        welcome_text = """
🎯 **Deal Alert Bot**

Get instant notifications for:
• Price drops >30%
• Arbitrage opportunities  
• Flash sales

Join our free channel: @dealsalerting
        """
        await update.message.reply_text(welcome_text, parse_mode='Markdown')
    
    async def send_deal(self, channel_id: str, title: str, price: str, url: str, discount: str = ""):
        """Send deal to channel"""
        text = f"🔥 **DEAL ALERT**\n\n"
        text += f"📦 {title}\n"
        text += f"💰 **{price}**\n"
        if discount:
            text += f"📉 Save {discount}\n"
        text += f"\n🛒 [Buy Now]({url})"
        
        await self.bot.send_message(
            chat_id=channel_id,
            text=text,
            parse_mode='Markdown',
            disable_web_page_preview=False
        )
    
    async def test_deal(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Send test deal to channel"""
        await self.send_deal(
            channel_id=FREE_CHANNEL_ID,
            title="iPhone 16 Pro Max 256GB",
            price="$1,149",
            url="https://example.com/deal",
            discount="15%"
        )
        await update.message.reply_text("✅ Test deal sent to channel!")

def main():
    """Start the bot"""
    application = Application.builder().token(BOT_TOKEN).build()
    bot = DealBot()
    
    # Command handlers
    application.add_handler(CommandHandler("start", bot.start))
    application.add_handler(CommandHandler("test", bot.test_deal))
    
    logger.info("Bot starting...")
    application.run_polling()

if __name__ == '__main__':
    main()
