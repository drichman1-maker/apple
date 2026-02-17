import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Coin } from '../types/coin';
import PriceHistoryChart from './PriceHistoryChart';
import GradingDisplay from './GradingDisplay';

export default function CoinDetail() {
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchCoin = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/coins/${id}`);
        if (!response.ok) throw new Error('Failed to fetch coin');
        const data = await response.json();
        setCoin(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!coin) return <div>Coin not found</div>;

  const chartData = {
    labels: coin.priceHistory?.map((entry) => entry.date) || [],
    datasets: [
      {
        label: 'Price',
        data: coin.priceHistory?.map((entry) => entry.price) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{coin.name} ({coin.year})</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {coin.imageUrl && (
            <img
              src={coin.imageUrl}
              alt={coin.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          )}
        </div>
        <div>
          <GradingDisplay coin={coin} />
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Price History</h2>
            <PriceHistoryChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
