import { NextApiRequest, NextApiResponse } from 'next';
import { Coin } from '../../types/coin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      const response = await fetch(`http://localhost:3001/api/coins?category=${category}`);
      const coins: Coin[] = await response.json();
      res.status(200).json(coins);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch coins' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}