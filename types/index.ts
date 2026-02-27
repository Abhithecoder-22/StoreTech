export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
}
