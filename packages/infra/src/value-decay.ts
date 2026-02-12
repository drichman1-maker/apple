export type ChipGeneration = 'M1' | 'M2' | 'M3' | 'M4' | 'A17' | 'A18';

export class ValueDecayModel {
    private decayRates: Record<ChipGeneration, number[]> = {
        M1: [0.70, 0.60, 0.50], // 12mo, 24mo, 36mo
        M2: [0.75, 0.65, 0.55],
        M3: [0.80, 0.70, 0.60],
        M4: [0.85, 0.75, 0.65],
        A17: [0.65, 0.50, 0.40], // iPhones depreciate faster
        A18: [0.70, 0.55, 0.45],
    };

    getProjectedResaleValue(originalPrice: number, chip: ChipGeneration, monthsOwned: 12 | 24 | 36): number {
        const rates = this.decayRates[chip];
        let rate = 0.5; // Fallback

        if (monthsOwned === 12) rate = rates[0] ?? 0.85;
        else if (monthsOwned === 24) rate = rates[1] ?? 0.75;
        else if (monthsOwned === 36) rate = rates[2] ?? 0.65;

        return originalPrice * rate;
    }
}
