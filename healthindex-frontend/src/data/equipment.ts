export interface Equipment {
  id: string
  name: string
  slug: string
  description: string
  category: string
  image: string
  prices: {
    [retailer: string]: {
      price: number
      originalPrice?: number
      inStock: boolean
      url: string
    }
  }
  specs?: Record<string, string>
  features?: string[]
  rating?: number
  reviewCount?: number
}

// Using reliable placeholder images
export const equipment: Equipment[] = [
  // Compression Therapy
  {
    id: 'normatec-3',
    name: 'Normatec 3 Legs',
    slug: 'normatec-3-legs',
    description: 'Dynamic compression system for athletic recovery and circulation enhancement.',
    category: 'compression',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 1247,
    prices: {
      amazon: { price: 1295, originalPrice: 1495, inStock: true, url: 'https://amazon.com' },
      bestbuy: { price: 1299, originalPrice: 1499, inStock: true, url: 'https://bestbuy.com' },
      hyperice: { price: 1195, originalPrice: 1495, inStock: true, url: 'https://hyperice.com' },
      rei: { price: 1295, originalPrice: 1495, inStock: false, url: 'https://rei.com' },
      rogue: { price: 1245, originalPrice: 1445, inStock: true, url: 'https://roguefitness.com' }
    },
    specs: {
      'Pressure': '7 zones, 110 mmHg',
      'Sessions': '15-60 min adjustable',
      'Battery': '3+ hours wireless',
      'Weight': '4.2 lbs portable'
    },
    features: [
      'Patented pulse technology',
      '7 compression zones',
      'App control via Bluetooth',
      'TSA approved for travel'
    ]
  },
  
  // Cryotherapy
  {
    id: 'cryo-pro',
    name: 'Cryo Pro Chamber',
    slug: 'cryo-pro-chamber',
    description: 'Whole body cryotherapy chamber for professional and home use.',
    category: 'cryotherapy',
    image: 'https://images.unsplash.com/photo-1517649808956-1c1d272e4891?w=600&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 34,
    prices: {
      cryo: { price: 45000, originalPrice: 55000, inStock: true, url: 'https://cryo.com' },
      amazon: { price: 47999, originalPrice: 57999, inStock: false, url: 'https://amazon.com' },
      direct: { price: 42500, originalPrice: 52500, inStock: true, url: 'https://direct.com' }
    },
    specs: {
      'Temperature': '-166°F to -220°F',
      'Capacity': '1-3 people',
      'Power': '400V 3-phase',
      'Cooling': 'Electric nitrogen-free'
    }
  },
  
  // Red Light
  {
    id: 'joovv-solo',
    name: 'Joovv Solo Full Body',
    slug: 'joovv-solo',
    description: 'Clinical-grade red light therapy panel for full body treatment.',
    category: 'red-light',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef8c6a3cded?w=600&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 892,
    prices: {
      joovv: { price: 2395, originalPrice: 2995, inStock: true, url: 'https://joovv.com' },
      amazon: { price: 2450, originalPrice: 3050, inStock: true, url: 'https://amazon.com' },
      rei: { price: 2395, originalPrice: 2995, inStock: false, url: 'https://rei.com' },
      bestbuy: { price: 2499, originalPrice: 3099, inStock: true, url: 'https://bestbuy.com' }
    },
    specs: {
      'LEDs': '300 red/NIR',
      'Wavelengths': '660nm + 850nm',
      'Power': '100+ mW/cm² intensity',
      'Coverage': '24" x 16" treatment area'
    }
  },
  
  // PEMF
  {
    id: 'bemer-pro',
    name: 'BEMER Pro Set',
    slug: 'bemer-pro-set',
    description: 'Advanced PEMF therapy for enhanced circulation and recovery.',
    category: 'pemf',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 234,
    prices: {
      bemer: { price: 5990, originalPrice: 6990, inStock: true, url: 'https://bemer.com' },
      amazon: { price: 5899, originalPrice: 6899, inStock: true, url: 'https://amazon.com' }
    },
    specs: {
      'Frequency': '10-30 Hz adjustable',
      'Intensity': '3-100 μT',
      'Programs': '10 preset + custom',
      'Mat': '70" x 24" full body'
    }
  },
  
  // Sauna
  {
    id: 'clearlight-is5',
    name: 'Clearlight IS-5',
    slug: 'clearlight-is5',
    description: 'Full spectrum infrared sauna for maximum health benefits.',
    category: 'sauna',
    image: 'https://images.unsplash.com/photo-1553532434-5ab5b6b84993?w=600&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 178,
    prices: {
      clearlight: { price: 7495, originalPrice: 8995, inStock: true, url: 'https://clearlight.com' },
      costco: { price: 6999, originalPrice: 8499, inStock: true, url: 'https://costco.com' },
      wayfair: { price: 7599, originalPrice: 9099, inStock: true, url: 'https://wayfair.com' }
    },
    specs: {
      'Capacity': '1-2 persons',
      'Heaters': '8 carbon/ceramic',
      'EMF': '<2mG ultra low',
      'Wood': 'Canadian cedar'
    }
  },
  
  // Massage
  {
    id: 'theragun-elite',
    name: 'Theragun Elite',
    slug: 'theragun-elite',
    description: 'Premium percussive therapy for deep muscle recovery.',
    category: 'massage-gun',
    image: 'https://images.unsplash.com/photo-1616279969096-54f42f1838f6?w=600&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 3421,
    prices: {
      therabody: { price: 399, originalPrice: 499, inStock: true, url: 'https://therabody.com' },
      amazon: { price: 379, originalPrice: 479, inStock: true, url: 'https://amazon.com' },
      bestbuy: { price: 389, originalPrice: 489, inStock: true, url: 'https://bestbuy.com' }
    },
    specs: {
      'Speed': '1750-2400 PPM',
      'Amplitude': '16mm deep tissue',
      'Force': '40 lbs stall force',
      'Battery': '120 min runtime'
    }
  },
  
  // Contrast Therapy
  {
    id: 'plunge-pro',
    name: 'Plunge Pro Cold Tub',
    slug: 'plunge-pro',
    description: 'Professional cold water immersion with filtration and cooling.',
    category: 'contrast-therapy',
    image: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e5c?w=600&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 89,
    prices: {
      plunge: { price: 5990, originalPrice: 6990, inStock: true, url: 'https://plunge.com' },
      amazon: { price: 6199, originalPrice: 7199, inStock: true, url: 'https://amazon.com' }
    },
    specs: {
      'Temperature': '39-55°F controlled',
      'Filtration': 'UV + Ozone system',
      'Size': 'Compact 48" footprint',
      'Power': '110V standard'
    }
  },
  
  // Hyperbaric
  {
    id: 'oxysoft-chamber',
    name: 'OxySoft HBOT Chamber',
    slug: 'oxysoft-chamber',
    description: 'Mild hyperbaric oxygen therapy for home wellness.',
    category: 'hyperbaric',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    prices: {
      oxyhealth: { price: 4995, originalPrice: 5995, inStock: true, url: 'https://oxyhealth.com' },
      amazon: { price: 4895, originalPrice: 5895, inStock: true, url: 'https://amazon.com' }
    },
    specs: {
      'Pressure': '1.3 ATA (4.4 PSI)',
      'Material': 'Medical-grade TPU',
      'Compressor': 'Oil-free quiet',
      'Setup': '15 minute assembly'
    }
  }
]

export const categories = [
  { id: 'compression', name: 'Compression', slug: 'compression', icon: 'Activity', color: '#00e5ff', description: 'Compression boots & therapy' },
  { id: 'cryotherapy', name: 'Cryo', slug: 'cryotherapy', icon: 'Snowflake', color: '#06b6d4', description: 'Whole body cryo chambers' },
  { id: 'red-light', name: 'Red Light', slug: 'red-light', icon: 'Sun', color: '#f59e0b', description: 'Photobiomodulation therapy' },
  { id: 'pemf', name: 'PEMF', slug: 'pemf', icon: 'Zap', color: '#10b981', description: 'Electromagnetic therapy' },
  { id: 'sauna', name: 'Sauna', slug: 'sauna', icon: 'Flame', color: '#ef4444', description: 'Infrared heat therapy' },
  { id: 'massage-gun', name: 'Massage', slug: 'massage-gun', icon: 'GripHorizontal', color: '#ec4899', description: 'Percussion therapy' },
  { id: 'contrast-therapy', name: 'Contrast', slug: 'contrast-therapy', icon: 'Thermometer', color: '#7c3aed', description: 'Hot & cold therapy' },
  { id: 'hyperbaric', name: 'HBOT', slug: 'hyperbaric', icon: 'Wind', color: '#8b5cf6', description: 'Oxygen therapy chambers' }
]
