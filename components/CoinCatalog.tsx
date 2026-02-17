import { Coin } from '../types/coin';

export default function CoinCatalog({ coins }: { coins: Coin[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coins.map((coin) => (
        <div key={coin.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold">{coin.name}</h2>
          <p className="text-gray-600">{coin.year} • {coin.country}</p>
          <p className="mt-2">Condition: {coin.condition}</p>
          <a href={`/coins/${coin.id}`} className="mt-4 inline-block text-blue-600 hover:underline">
            View Details
          </a>
        </div>
      ))}
    </div>
  );
}
