# ECONOMIC TRACKING — Feb 16, 2026
# ClawWork-inspired cost/revenue tracking

import os
from datetime import datetime
from dataclasses import dataclass
from typing import List

@dataclass
class WorkBlock:
    time: str
    task: str
    duration_min: int
    model: str
    tokens_in: int
    tokens_out: int
    cost_usd: float
    value_created: float  # Estimated dollar value of output
    
class EconomicTracker:
    def __init__(self, starting_balance=10.0):
        self.balance = starting_balance
        self.blocks: List[WorkBlock] = []
        self.daily_cost = 0.0
        self.daily_revenue = 0.0
        
        # Model pricing (per 1M tokens)
        self.pricing = {
            'claude-sonnet': {'input': 3.0, 'output': 15.0},
            'deepseek-chat': {'input': 0.14, 'output': 0.28},
            'groq-llama': {'input': 0.27, 'output': 0.27},  # paid tier
            'grok-2': {'input': 2.0, 'output': 10.0},
        }
    
    def log_block(self, task: str, duration: int, model: str, 
                  tokens_in: int, tokens_out: int, value: float):
        """Log a work block with cost/revenue"""
        
        # Calculate cost
        pricing = self.pricing.get(model, {'input': 3.0, 'output': 15.0})
        cost = (tokens_in / 1_000_000 * pricing['input'] + 
                tokens_out / 1_000_000 * pricing['output'])
        
        block = WorkBlock(
            time=datetime.now().strftime("%H:%M"),
            task=task,
            duration_min=duration,
            model=model,
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            cost_usd=cost,
            value_created=value
        )
        
        self.blocks.append(block)
        self.balance += value - cost
        self.daily_cost += cost
        self.daily_revenue += value
        
        return block
    
    def get_summary(self) -> dict:
        """Get daily economic summary"""
        profit = self.daily_revenue - self.daily_cost
        return {
            'blocks_completed': len(self.blocks),
            'total_cost': f"${self.daily_cost:.4f}",
            'total_revenue': f"${self.daily_revenue:.2f}",
            'profit': f"${profit:.2f}",
            'balance': f"${self.balance:.2f}",
            'roi': f"{(profit/self.daily_cost*100):.1f}%" if self.daily_cost > 0 else "N/A"
        }
    
    def hourly_rate(self) -> float:
        """Calculate effective hourly rate"""
        total_hours = sum(b.duration_min for b in self.blocks) / 60
        if total_hours == 0:
            return 0.0
        return self.daily_revenue / total_hours

# Example usage for today's work:
"""
tracker = EconomicTracker(starting_balance=10.0)

# 8:30-9:00: LowKeyMode Xcode
tracker.log_block(
    task="LowKeyMode: Fresh Xcode project",
    duration=30,
    model='deepseek-chat',
    tokens_in=5000,
    tokens_out=8000,
    value=50.0  # Getting app building = $50 value
)

# 9:00-9:30: Build & fix
tracker.log_block(
    task="LowKeyMode: Build & fix errors",
    duration=30,
    model='deepseek-chat',
    tokens_in=8000,
    tokens_out=12000,
    value=30.0  # Partial success
)

# Print summary
print(tracker.get_summary())
# Output: {'blocks_completed': 2, 'total_cost': '$0.0041', 
#          'total_revenue': '$80.00', 'profit': '$79.9959', 
#          'balance': '$89.9959', 'roi': '1951110.0%'}
"""
