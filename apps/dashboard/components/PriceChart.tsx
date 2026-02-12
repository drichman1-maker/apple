'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PriceHistoryPoint } from '@repo/domain';
import { format } from 'date-fns';

interface PriceChartProps {
    data: PriceHistoryPoint[];
    days?: 30 | 60 | 90;
}

export default function PriceChart({ data, days = 90 }: PriceChartProps) {
    const chartData = data.reduce((acc, point) => {
        const existing = acc.find(d => d.date === point.date);
        if (existing) {
            existing[point.retailer] = point.price;
        } else {
            acc.push({
                date: point.date,
                [point.retailer]: point.price,
            });
        }
        return acc;
    }, [] as any[]);

    const filteredData = chartData.slice(-days);

    return (
        <div className="w-full h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#4b5563"
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                        tickFormatter={(value) => format(new Date(value), 'MMM d')}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#4b5563"
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                        tickFormatter={(value) => `$${value}`}
                        axisLine={false}
                        tickLine={false}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(17, 17, 17, 0.95)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '12px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ fontSize: '12px' }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                        labelFormatter={(label) => format(new Date(label), 'EEEE, MMM d, yyyy')}
                    />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    />
                    <Line type="monotone" dataKey="Apple" stroke="#2997ff" strokeWidth={2} dot={false} activeDot={{ r: 4, stroke: '#2997ff', strokeWidth: 2, fill: '#000' }} />
                    <Line type="monotone" dataKey="Best Buy" stroke="#facc15" strokeWidth={2} dot={false} activeDot={{ r: 4, stroke: '#facc15', strokeWidth: 2, fill: '#000' }} />
                    <Line type="monotone" dataKey="B&H" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4, stroke: '#ef4444', strokeWidth: 2, fill: '#000' }} />
                    <Line type="monotone" dataKey="Adorama" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4, stroke: '#10b981', strokeWidth: 2, fill: '#000' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
