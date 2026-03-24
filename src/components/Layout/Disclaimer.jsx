import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-zinc-400">
          <p className="mb-2">
            <strong className="text-zinc-300">Disclaimer:</strong> Prices and stock status are for reference only and may not reflect real-time availability. 
            We strive for accuracy but cannot guarantee it. Always verify directly with retailers before purchasing.
          </p>
          <p>
            TheresMac is a free service. We earn commissions through affiliate links when you make purchases. 
            This comes at no additional cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
