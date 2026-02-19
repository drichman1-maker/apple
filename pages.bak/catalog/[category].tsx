import { GetStaticProps } from 'next';
import { Coin } from '../types/coin';

interface CatalogPageProps {
  coins: Coin[];
  category: string;
}

export default function CatalogPage({ coins, category }: CatalogPageProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{category} Coins</h1>
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
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const res = await fetch(`http://localhost:3001/api/coins?category=${category}`);
  const coins = await res.json();

  return {
    props: {
      coins,
      category,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: 'us' } },
      { params: { category: 'world' } },
      { params: { category: 'ancient' } },
    ],
    fallback: false,
  };
}
