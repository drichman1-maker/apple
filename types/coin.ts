export interface Coin {
  id: string;
  name: string;
  year: number;
  country: string;
  denomination: string;
  condition: string;
  pcgsGrade?: string;
  pcgsCertNumber?: string;
  ngcGrade?: string;
  ngcCertNumber?: string;
  priceHistory?: {
    date: string;
    price: number;
  }[];
  imageUrl?: string;
}
