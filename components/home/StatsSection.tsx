'use client';

import { useState, useEffect } from 'react';
import { Coins, Award, TrendingUp, Users } from 'lucide-react';

interface Stat {
  name: string;
  value: string;
  icon: React.ComponentType<any>;
  description: string;
}

export function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([
    {
      name: 'Total Coins',
      value: '9,764',
      icon: Coins,
      description: 'Coins in our database'
    },
    {
      name: 'Certified Grades',
      value: '24,891',
      icon: Award,
      description: 'PCGS & NGC certifications'
    },
    {
      name: 'Price Records',
      value: '156,203',
      icon: TrendingUp,
      description: 'Historical price points'
    },
    {
      name: 'Active Collectors',
      value: '2,847',
      icon: Users,
      description: 'Community members'
    }
  ]);

  // Animate numbers on mount
  useEffect(() => {
    const animateNumber = (finalValue: string, index: number) => {
      const numericValue = parseInt(finalValue.replace(/,/g, ''));
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = numericValue / steps;
      
      let currentValue = 0;
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          currentValue = numericValue;
          clearInterval(timer);
        }
        
        const formattedValue = Math.floor(currentValue).toLocaleString();
        setStats(prevStats => {
          const newStats = [...prevStats];
          newStats[index] = { ...newStats[index], value: formattedValue };
          return newStats;
        });
      }, duration / steps);
    };

    // Start animations with delays
    stats.forEach((stat, index) => {
      setTimeout(() => {
        animateNumber(stat.value, index);
      }, index * 200);
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Collectors Worldwide
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Join thousands of collectors who rely on our comprehensive database 
            for accurate coin information and market insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.name}
              className="text-center group"
            >
              <div className="bg-white/10 dark:bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.name}
                </div>
                
                <div className="text-sm text-primary-100">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-primary-100 text-sm">
            Data updated daily from trusted sources including PCGS, NGC, and major auction houses
          </p>
        </div>
      </div>
    </div>
  );
}