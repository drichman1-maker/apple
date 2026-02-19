import { Product } from '@/types'

export const products: Product[] = [
  // Red Light Therapy
  {
    id: 'joovv-go',
    name: 'Joovv Go 2.0',
    slug: 'joovv-go-2',
    brand: 'Joovv',
    category: 'red-light',
    price: 195,
    rating: 4.8,
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop',
    description: 'Portable red light therapy device perfect for targeted treatment on-the-go.',
    features: [
      'Clinically proven red light wavelengths (660nm, 850nm)',
      'Portable and lightweight design',
      'Battery powered for travel',
      '3-year warranty',
      'EMF-free design'
    ],
    specifications: {
      'Dimensions': '8.5" x 4.5" x 1.25"',
      'Weight': '1.2 lbs',
      'Power': 'Battery powered',
      'Treatment Area': '6" x 3"',
      'Wavelengths': '660nm, 850nm'
    },
    affiliateLink: 'https://joovv.com/products/go',
    inStock: true
  },
  {
    id: 'red-light-rising-face-panel',
    name: 'Red Light Rising Face Panel',
    slug: 'red-light-rising-face-panel',
    brand: 'Red Light Rising',
    category: 'red-light',
    price: 299,
    rating: 4.7,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
    description: 'Professional-grade red light therapy panel designed specifically for facial treatments.',
    features: [
      'High-power LEDs for deep penetration',
      'Optimal wavelengths for skin health',
      'Timer function',
      'Wall-mountable design',
      'Low EMF emissions'
    ],
    affiliateLink: 'https://redlightrising.co.uk/face-panel',
    inStock: true
  },
  
  // PEMF Devices
  {
    id: 'bemer-classic',
    name: 'BEMER Classic Set',
    slug: 'bemer-classic',
    brand: 'BEMER',
    category: 'pemf',
    price: 1290,
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
    description: 'Professional PEMF therapy system for improved circulation and wellness.',
    features: [
      'Patented PEMF signal',
      'Full-body treatment mat',
      'Adjustable intensity levels',
      '20-minute treatment sessions',
      'Clinically tested'
    ],
    specifications: {
      'Dimensions': '24" x 16" x 6"',
      'Weight': '12 lbs',
      'Power': '110-240V AC',
      'Sessions': '8 minutes standard',
      'Warranty': '3 years'
    },
    affiliateLink: 'https://bemer.com/classic',
    inStock: true
  },
  {
    id: 'imrs-2000',
    name: 'iMRS 2000 Complete System',
    slug: 'imrs-2000',
    brand: 'Swiss Bionic Solutions',
    category: 'pemf',
    price: 4395,
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop',
    description: 'The worlds most advanced PEMF therapy system with intelligent biofeedback.',
    features: [
      'HRV biofeedback integration',
      'Sawtooth wave technology',
      'Full body mat plus accessories',
      'Brainwave entrainment',
      'Professional grade'
    ],
    affiliateLink: 'https://swissbionic.com/imrs-2000',
    inStock: true
  },
  
  // Saunas
  {
    id: 'sunlighten-solo',
    name: 'Sunlighten mPULSE Solo',
    slug: 'sunlighten-solo',
    brand: 'Sunlighten',
    category: 'sauna',
    price: 3995,
    rating: 4.8,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop',
    description: 'Single-person infrared sauna with advanced heater technology.',
    features: [
      'Solocarbon far infrared heaters',
      'Chromotherapy lighting',
      'Bluetooth audio system',
      'Easy assembly',
      'Lifetime heater warranty'
    ],
    specifications: {
      'Dimensions': '47" x 39" x 75"',
      'Weight': '295 lbs',
      'Power': '120V / 15A',
      'Interior Height': '73"',
      'Assembly Time': '45 minutes'
    },
    affiliateLink: 'https://sunlighten.com/mpulse-solo',
    inStock: true
  },
  {
    id: 'clearlight-premier',
    name: 'Clearlight Premier IS-1',
    slug: 'clearlight-premier',
    brand: 'Clearlight Infrared',
    category: 'sauna',
    price: 2895,
    rating: 4.7,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
    description: 'Compact infrared sauna perfect for home use with premium features.',
    features: [
      'True Wave carbon/ceramic heaters',
      'Chromotherapy system',
      'Sound system with Bluetooth',
      'Low EMF design',
      '5-year warranty'
    ],
    affiliateLink: 'https://clearlightsaunas.com/premier-is-1',
    inStock: true
  },
  
  // Massage Guns
  {
    id: 'theragun-elite',
    name: 'Theragun Elite',
    slug: 'theragun-elite',
    brand: 'Therabody',
    category: 'massage-gun',
    price: 399,
    rating: 4.8,
    reviewCount: 1205,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
    description: 'Professional-grade percussive therapy device with smart features.',
    features: [
      'OLED display with force meter',
      'Bluetooth connectivity',
      '5 built-in speeds',
      '120-minute battery life',
      'QuietForce technology'
    ],
    specifications: {
      'Dimensions': '9.0" x 6.8" x 2.2"',
      'Weight': '2.2 lbs',
      'Battery': '120 minutes',
      'Amplitude': '16mm',
      'Attachments': '5 included'
    },
    affiliateLink: 'https://therabody.com/theragun-elite',
    inStock: true
  },
  {
    id: 'hypervolt-2-pro',
    name: 'Hypervolt 2 Pro',
    slug: 'hypervolt-2-pro',
    brand: 'Hyperice',
    category: 'massage-gun',
    price: 349,
    rating: 4.7,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop',
    description: 'Quiet, powerful massage gun with app integration and premium attachments.',
    features: [
      'Pressure sensor technology',
      'HyperSmart app integration',
      '5 head attachments',
      '3-hour battery life',
      'Whisper-quiet operation'
    ],
    affiliateLink: 'https://hyperice.com/hypervolt-2-pro',
    inStock: true
  },

  // Compression Therapy
  {
    id: 'normatec-3',
    name: 'Normatec 3 Plus',
    slug: 'normatec-3-plus',
    brand: 'Hyperice',
    category: 'compression',
    price: 599,
    rating: 4.9,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop',
    description: 'Premium compression recovery system with dynamic air pressure for legs, hips, and arms.',
    features: [
      '7 pressure levels',
      'Full leg, hip, and arm coverage',
      'FDA cleared',
      'Quantified Recovery app',
      '2-year warranty'
    ],
    specifications: {
      'Zones': '7 overlapping zones',
      'Pressure': '30-110 mmHg',
      'Sessions': '15, 30, 45, 60 min',
      'Weight': '2.5 lbs (control unit)'
    },
    affiliateLink: 'https://hyperice.com/normatec-3',
    inStock: true
  },
  {
    id: 'revix-compression',
    name: 'Revix Compression Boots',
    slug: 'revix-compression-boots',
    brand: 'Revix',
    category: 'compression',
    price: 349,
    rating: 4.6,
    reviewCount: 445,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop',
    description: 'Affordable compression boots with 4 chambers and adjustable pressure settings.',
    features: [
      '4 chambers for sequential compression',
      '6 pressure levels',
      'Multiple size options',
      'Quiet pump motor',
      '1-year warranty'
    ],
    specifications: {
      'Chambers': '4',
      'Pressure': '20-280 mmHg',
      'Sizes': 'S, M, L, XL',
      'Power': '110-240V'
    },
    affiliateLink: 'https://revixlife.com/products/compression-boots',
    inStock: true
  },

  // Contrast Therapy
  {
    id: 'hot-cold-pod',
    name: 'Hot Cold Pod Pro',
    slug: 'hot-cold-pod-pro',
    brand: 'SaunaBox',
    category: 'contrast-therapy',
    price: 1299,
    rating: 4.7,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop',
    description: 'Contrast therapy system combining hot and cold plunge in one compact unit.',
    features: [
      'Hot tub (95-104°F) and cold plunge (39-50°F)',
      'Digital temperature control',
      'Insulated cover included',
      'Quick heat recovery',
      '2-person capacity'
    ],
    specifications: {
      'Hot Temp': '95-104°F',
      'Cold Temp': '39-50°F',
      'Capacity': '150 gallons',
      'Power': '110V/15A'
    },
    affiliateLink: 'https://saunabox.com/hot-cold-pod',
    inStock: true
  },
  {
    id: 'plunge-pool',
    name: 'Plunge Pool Chiller',
    slug: 'plunge-pool-chiller',
    brand: 'Plunge',
    category: 'contrast-therapy',
    price: 999,
    rating: 4.8,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=600&fit=crop',
    description: 'Professional cold plunge with precise temperature control and UV sanitation.',
    features: [
      '38-103°F temperature range',
      'UV-C sanitation system',
      'Smartphone app control',
      'Quick cool technology',
      '3-year warranty'
    ],
    specifications: {
      'Temperature': '38-103°F',
      'Capacity': '100 gallons',
      'Cooling': '1.5°F per hour',
      'Power': '110V'
    },
    affiliateLink: 'https://plunge.com',
    inStock: true
  },

  // Cryotherapy
  {
    id: 'cryo-pro-x',
    name: 'Cryo Pro X Chamber',
    slug: 'cryo-pro-x-chamber',
    brand: 'Cryomed',
    category: 'cryotherapy',
    price: 45000,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=600&fit=crop',
    description: 'Commercial whole-body cryotherapy chamber with nitrogen-free operation.',
    features: [
      'Nitrogen-free (electric) operation',
      'Multiple safety sensors',
      'Touchscreen interface',
      'Largest treatment area',
      'CE certified'
    ],
    specifications: {
      'Temperature': '-166°F to -220°F',
      'Chamber Size': '7.5 ft height',
      'Session Time': '1-3 minutes',
      'Power': '400V/32A'
    },
    affiliateLink: 'https://cryomed.pro',
    inStock: false
  },
  {
    id: 'cryo-tunnel',
    name: 'Cryo Elite Tunnel',
    slug: 'cryo-elite-tunnel',
    brand: 'CryoScience',
    category: 'cryotherapy',
    price: 35000,
    rating: 4.8,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
    description: 'Walk-in cryotherapy tunnel with comfortable entry and precise temperature control.',
    features: [
      'Walk-in design for comfort',
      'Nitrogen gas powered',
      'Rapid cool down (2 min)',
      'Emergency stop button',
      'Ventilation system'
    ],
    specifications: {
      'Temperature': '-200°F',
      'Entry': 'Walk-in tunnel',
      'Session': 'Up to 3 minutes',
      'Power': '220V'
    },
    affiliateLink: 'https://cryoscience.com',
    inStock: false
  },

  // Hyperbaric
  {
    id: 'hyperbaric-soft',
    name: 'Soft Hyperbaric Chamber',
    slug: 'soft-hyperbaric-chamber',
    brand: 'Oxygen Health',
    category: 'hyperbaric',
    price: 4995,
    rating: 4.7,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop',
    description: 'Soft-sided hyperbaric chamber reaching 1.3 ATA for home use.',
    features: [
      '1.3 ATA max pressure',
      'Quiet air pump',
      'Spacious interior',
      'Viewing window',
      '2-year warranty'
    ],
    specifications: {
      'Pressure': '1.3 ATA',
      'Diameter': '36 inches',
      'Length': '7 feet',
      'Power': '110V'
    },
    affiliateLink: 'https://oxygenhealth.com',
    inStock: true
  },
  {
    id: 'hyperbaric-hard',
    name: 'Hard Hyperbaric Chamber',
    slug: 'hard-hyperbaric-chamber',
    brand: 'Hyperbaric Clear',
    category: 'hyperbaric',
    price: 14995,
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=600&fit=crop',
    description: 'Hard-sided monoplace hyperbaric chamber reaching 2.0+ ATA.',
    features: [
      '2.0+ ATA pressure capability',
      'Medical-grade construction',
      'Intercom system',
      'TV/entertainment mount',
      '5-year warranty'
    ],
    specifications: {
      'Pressure': '2.0-3.0 ATA',
      'Diameter': '36 inches',
      'Length': '7.5 feet',
      'Power': '110V/15A'
    },
    affiliateLink: 'https://hyperbaricclear.com',
    inStock: true
  }
]

export const categories = [
  {
    id: 'compression',
    name: 'Compression Therapy',
    slug: 'compression',
    description: 'Dynamic air compression for lymphatic drainage and muscle recovery.',
    icon: '💨',
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop'
  },
  {
    id: 'contrast-therapy',
    name: 'Contrast Therapy',
    slug: 'contrast-therapy',
    description: 'Hot and cold therapy cycles for enhanced circulation and recovery.',
    icon: '🔥',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop'
  },
  {
    id: 'cryotherapy',
    name: 'Cryotherapy',
    slug: 'cryotherapy',
    description: 'Extreme cold therapy for inflammation reduction and rapid recovery.',
    icon: '❄️',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=400&fit=crop'
  },
  {
    id: 'hyperbaric',
    name: 'Hyperbaric Oxygen',
    slug: 'hyperbaric',
    description: 'Pressurized oxygen therapy for enhanced healing and cellular repair.',
    icon: '🫁',
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop'
  },
  {
    id: 'red-light',
    name: 'Red Light Therapy',
    slug: 'red-light',
    description: 'Harness the power of red and near-infrared light for cellular health and recovery.',
    icon: '🔴',
    color: 'red',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop'
  },
  {
    id: 'pemf',
    name: 'PEMF Therapy',
    slug: 'pemf',
    description: 'Pulsed electromagnetic field therapy for enhanced circulation and wellness.',
    icon: '⚡',
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop'
  },
  {
    id: 'sauna',
    name: 'Infrared Saunas',
    slug: 'sauna',
    description: 'Experience deep heat therapy and detoxification with infrared saunas.',
    icon: '🔥',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=400&fit=crop'
  },
  {
    id: 'massage-gun',
    name: 'Massage Guns',
    slug: 'massage-guns',
    description: 'Percussive therapy devices for muscle recovery and pain relief.',
    icon: '💪',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=400&fit=crop'
  }
]