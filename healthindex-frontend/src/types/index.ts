export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  category: 'red-light' | 'pemf' | 'sauna' | 'massage-gun' | 'compression' | 'contrast-therapy' | 'cryotherapy' | 'hyperbaric'
  price: number
  rating: number
  reviewCount: number
  image: string
  gallery?: string[]
  description: string
  features?: string[]
  specifications?: Record<string, string>
  affiliateLink: string
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  image: string
}