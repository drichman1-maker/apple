'use client';

import { useState, useEffect } from 'react';

interface NotificationToggleProps {
    productName: string;
    currentPrice: number;
}

export default function NotificationToggle({ productName, currentPrice }: NotificationToggleProps) {
    const [enabled, setEnabled] = useState(false);
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [targetPrice, setTargetPrice] = useState(currentPrice * 0.9);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            const perm = await Notification.requestPermission();
            setPermission(perm);
            if (perm === 'granted') {
                setEnabled(true);
                new Notification('Price Alerts Enabled', {
                    body: `You'll be notified when ${productName} drops below $${targetPrice.toFixed(0)}`,
                });
            }
        }
    };

    const toggleNotifications = () => {
        if (!enabled && permission !== 'granted') {
            requestPermission();
        } else {
            setEnabled(!enabled);
        }
    };

    return (
        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Price Alerts</h3>
                    <button
                        onClick={toggleNotifications}
                        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-[#2997ff]' : 'bg-white/10'
                            }`}
                    >
                        <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-lg ${enabled ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        />
                    </button>
                </div>
                <p className="text-xs text-gray-500 font-medium">Get a push notification when this product reaches your target price.</p>
            </div>

            <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <span className="text-[10px] text-gray-500 uppercase font-black block mb-1">Target Price</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                            <input
                                type="number"
                                value={Math.round(targetPrice)}
                                onChange={(e) => setTargetPrice(Number(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-7 pr-3 text-white text-sm focus:outline-none focus:border-[#2997ff] transition-all"
                            />
                        </div>
                    </div>
                    <div className="w-1/3 text-right">
                        <span className="text-[10px] text-gray-500 uppercase font-black block mb-1">Threshold</span>
                        <div className="text-sm font-bold text-white">
                            -{Math.round((1 - targetPrice / currentPrice) * 100)}%
                        </div>
                    </div>
                </div>

                <p className="text-[10px] text-gray-600 font-medium">
                    Current market low: ${currentPrice.toFixed(0)} • Retail average: ${currentPrice.toFixed(0)}
                </p>
            </div>
        </div>
    );
}
