const BASE_URL = 'http://localhost:3001/api';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export const compareProducts = async (productIds) => {
  try {
    const response = await fetch(`${BASE_URL}/compare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productIds })
    });
    
    if (!response.ok) {
      throw new Error('Failed to compare products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error comparing products:', error);
    return null;
  }
};