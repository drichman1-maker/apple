export interface TaxService {
    calculateTax(price: number, zipCode: string): number;
}

export class DefaultTaxService implements TaxService {
    private stateRates: Record<string, number> = {
        '10001': 0.08875, // NYC
        '90210': 0.095,   // CA
        '33101': 0.07,    // FL
    };

    calculateTax(price: number, zipCode: string): number {
        const rate = this.stateRates[zipCode] || 0.05; // Default 5%
        return price * rate;
    }
}
