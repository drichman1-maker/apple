export class TelemetryService {
    logInterest(sku: string, strikePrice: number, location: string): void {
        console.log(`[TELEMETRY] Interest captured: SKU=${sku}, Price=${strikePrice}, Loc=${location}`);
        // In production, this would send to an analytics endpoint or queue
    }
}
