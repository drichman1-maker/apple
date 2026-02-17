import { NextPage } from 'next';
import { Coin } from '../types/coin';
import CoinCatalog from '../components/CoinCatalog';

interface HomeProps {
  featuredCoins: Coin[];
}

const Home: NextPage<HomeProps> = ({ featuredCoins }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to CoinCurator</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Coins</h2>
        <CoinCatalog coins={featuredCoins} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <a href="/catalog/us" className="border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
          <h3 className="text-xl font-semibold">US Coins</h3>
          <p className="mt-2 text-gray-600">Explore rare US coins</p>
        </a>
        <a href="/catalog/world" className="border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
          <h3 className="text-xl font-semibold">World Coins</h3>
          <p className="mt-2 text-gray-600">Discover coins from around the world</p>
        </a>
        <a href="/catalog/ancient" className="border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
          <h3 className="text-xl font-semibold">Ancient Coins</h3>
          <p className="mt-2 text-gray-600">Journey through history</p>
        </a>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch('http://localhost:3001/api/coins/featured');
  const featuredCoins = await res.json();

  return {
    props: {
      featuredCoins,
    },
  };
}

export default Home;