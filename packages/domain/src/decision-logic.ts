import { NOCResult } from './types';

export class DecisionLogic {
    static evaluate(nocResult: NOCResult, marketVolatility: boolean, daysUntilEvent: number): NOCResult {
        const { retailPrice } = nocResult;

        // Logic Rule 1: High Volatility or Event Proximity
        if (marketVolatility || daysUntilEvent < 30) {
            return {
                ...nocResult,
                decision: 'WAIT',
                rationale: daysUntilEvent < 30 ? 'Apple Event Imminent (<30 days).' : 'High Market Volatility detected.',
            };
        }

        // Logic Rule 2: Basic 'Buy Now' if stable
        // In a real app, this would compare against historic lows.
        // For V1, we assume if it's not "Wait", it's "Buy Now".
        return {
            ...nocResult,
            decision: 'BUY_NOW',
            rationale: 'Optimal effective ownership window. Stable market conditions.',
        };
    }
}
