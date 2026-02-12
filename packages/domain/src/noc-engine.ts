import { PriceOracle, TaxService, ValueDecayModel } from '@repo/infra';
import { NOCResult, ProductConfig, DecisionState } from './types';

export class NOCEngine {
    constructor(
        private oracle: PriceOracle,
        private taxService: TaxService,
        private decayModel: ValueDecayModel
    ) { }

    async calculate(config: ProductConfig, zipCode: string, monthsOwned: 12 | 24 | 36 = 36): Promise<NOCResult> {
        const retailPrice = await this.oracle.fetchPrice(config.sku);
        const effectivePrice = retailPrice === 9999 ? config.basePrice : retailPrice; // Fallback handling

        const salesTax = this.taxService.calculateTax(effectivePrice, zipCode);
        const projectedResaleValue = this.decayModel.getProjectedResaleValue(effectivePrice, config.chip, monthsOwned);

        const netOwnershipCost = (effectivePrice + salesTax) - projectedResaleValue;

        return {
            netOwnershipCost,
            retailPrice: effectivePrice,
            salesTax,
            projectedResaleValue,
            decision: 'WAIT', // Default, will be overridden by DecisionLogic
            rationale: 'Calculation complete.',
        };
    }
}
