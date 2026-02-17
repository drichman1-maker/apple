'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function CategoryShowcase() {
  const categories = [
    {
      name: 'United States Coins',
      slug: 'us',
      description: 'From colonial times to modern issues, explore the rich history of American coinage.',
      image: '/images/categories/us-coins.jpg',
      featured: ['Morgan Silver Dollars', 'Walking Liberty Half Dollars', 'Mercury Dimes'],
      totalCoins: '2,847',
    },
    {
      name: 'World Coins',
      slug: 'world',
      description: 'Discover coins from countries around the globe, spanning centuries of world history.',
      image: '/images/categories/world-coins.jpg',
      featured: ['British Sovereigns', 'Canadian Silver', 'Mexican Pesos'],
      totalCoins: '5,623',
    },
    {
      name: 'Ancient Coins',
      slug: 'ancient',
      description: 'Journey through antiquity with coins from ancient civilizations and empires.',
      image: '/images/categories/ancient-coins.jpg',
      featured: ['Roman Denarii', 'Greek Tetradrachms', 'Byzantine Solidi'],
      totalCoins: '1,294',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Explore by Category
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Browse our comprehensive catalog organized by origin and historical period.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.slug} className="group">
            <div className="coin-card overflow-hidden h-full">
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium opacity-90">
                    {category.totalCoins} coins
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {category.description}
                  </p>
                </div>

                {/* Featured items */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Popular Items:
                  </h4>
                  <ul className="space-y-1">
                    {category.featured.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={`/catalog?category=${category.slug}`}
                  className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
                >
                  <span>Explore {category.name}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/catalog"
          className="btn-secondary"
        >
          Browse All Categories
        </Link>
      </div>
    </div>
  );
}