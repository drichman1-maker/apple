'use client';

import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem,
} from 'chart.js';
import { Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { PriceHistory, Grade } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceChartProps {
  priceHistory: PriceHistory[];
  coinName: string;
  selectedGrade?: Grade | null;
}

export function PriceChart({ priceHistory, coinName, selectedGrade }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1Y');

  // Filter data by time range
  const filteredData = useMemo(() => {
    if (timeRange === 'ALL') return priceHistory;

    const now = new Date();
    const cutoffDate = new Date(now);

    switch (timeRange) {
      case '1M':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6M':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1Y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return priceHistory.filter(point => new Date(point.saleDate) >= cutoffDate);
  }, [priceHistory, timeRange]);

  // Sort by date and prepare chart data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => 
      new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime()
    );
  }, [filteredData]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (sortedData.length === 0) return null;

    const prices = sortedData.map(d => d.price);
    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2] || prices[0];
    const change = currentPrice - previousPrice;
    const changePercent = previousPrice !== 0 ? (change / previousPrice) * 100 : 0;

    return {
      currentPrice,
      change,
      changePercent,
      highPrice: Math.max(...prices),
      lowPrice: Math.min(...prices),
      averagePrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
      totalSales: sortedData.length,
    };
  }, [sortedData]);

  // Chart data configuration
  const chartData: ChartData<'line'> = {
    labels: sortedData.map(point => formatDate(point.saleDate)),
    datasets: [
      {
        label: selectedGrade ? `${selectedGrade.grade} Price` : 'Price',
        data: sortedData.map(point => point.price),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(79, 70, 229)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart options
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
        callbacks: {
          title: (context: TooltipItem<'line'>[]) => {
            const dataIndex = context[0].dataIndex;
            const point = sortedData[dataIndex];
            return formatDate(point.saleDate);
          },
          label: (context: TooltipItem<'line'>) => {
            const dataIndex = context.dataIndex;
            const point = sortedData[dataIndex];
            return [
              `Price: ${formatPrice(point.price)}`,
              `Source: ${point.source}`,
              ...(point.auction ? [`Auction: ${point.auction}`] : []),
              ...(point.lot ? [`Lot: ${point.lot}`] : []),
            ];
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          maxTicksLimit: 8,
          color: 'rgb(107, 114, 128)',
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          callback: (value) => formatPrice(Number(value)),
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  if (priceHistory.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Price History
        </h2>
        <div className="text-center py-8">
          <DollarSign className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No price history available for this coin yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Price History
            {selectedGrade && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({selectedGrade.grade})
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Historical auction and dealer prices for {coinName}
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(stats.currentPrice)}
            </div>
            <div className={`text-sm flex items-center justify-center space-x-1 ${
              stats.change >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{stats.changePercent >= 0 ? '+' : ''}{stats.changePercent.toFixed(1)}%</span>
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">High</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(stats.highPrice)}
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Low</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(stats.lowPrice)}
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(stats.averagePrice)}
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-80 mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Recent Sales */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
          Recent Sales
        </h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {sortedData.slice(-10).reverse().map((sale, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatPrice(sale.price)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(sale.saleDate)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {sale.source}
                </div>
                {sale.auction && (
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {sale.auction}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <p>
          Price data sourced from major auction houses and certified dealers. 
          Prices shown are hammer prices and may not include buyer's premiums.
        </p>
      </div>
    </div>
  );
}