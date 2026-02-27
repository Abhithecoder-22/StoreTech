import { Product } from '@/types'

const API_BASE_URL = 'https://fakestoreapi.com'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export async function fetchProduct(id: string | number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }
  return response.json()
}
