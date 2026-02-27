export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
  stock: number
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    description: 'High-quality sound with active noise cancellation',
    rating: 4.8,
    reviews: 234,
    stock: 15,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Ultra-HD 4K Webcam',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    description: 'Crystal clear video for professional streaming',
    rating: 4.6,
    reviews: 156,
    stock: 22,
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Mechanical Gaming Keyboard',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1587829191301-4b34e2121990?w=500&h=500&fit=crop',
    description: 'RGB backlit keys with responsive switches',
    rating: 4.7,
    reviews: 189,
    stock: 30,
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Ergonomic Mouse Pad',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    description: 'Extra-large surface with wrist support',
    rating: 4.5,
    reviews: 98,
    stock: 45,
    category: 'Accessories'
  },
  {
    id: '5',
    name: '2TB External SSD',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    description: 'Fast transfer speeds up to 1050MB/s',
    rating: 4.9,
    reviews: 312,
    stock: 18,
    category: 'Storage'
  },
  {
    id: '6',
    name: 'USB-C Hub Adapter',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    description: '7-in-1 multi-port connectivity',
    rating: 4.4,
    reviews: 127,
    stock: 50,
    category: 'Accessories'
  },
  {
    id: '7',
    name: 'Portable Phone Charger',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    description: '20000mAh capacity with dual ports',
    rating: 4.6,
    reviews: 201,
    stock: 60,
    category: 'Accessories'
  },
  {
    id: '8',
    name: 'Desk Lamp with USB Port',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    description: 'Adjustable brightness with charging capability',
    rating: 4.7,
    reviews: 145,
    stock: 25,
    category: 'Lighting'
  },
]
