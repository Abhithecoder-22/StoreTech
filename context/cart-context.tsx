'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { Product, CartItem } from '@/types'
import { toast } from '@/hooks/use-toast'

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartCount: () => number
  getSubtotal: () => number
  isInCart: (productId: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  const addToCart = (product: Product) => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find((item: CartItem) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item: CartItem) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { product, quantity: 1 }]
    })
    toast({
      title: 'Added to cart',
      description: product.title,
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart: CartItem[]) => prevCart.filter((item: CartItem) => item.product.id !== productId))
    toast({
      title: 'Removed from cart',
      description: `Item removed from cart`,
      variant: 'destructive',
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart: CartItem[]) =>
      prevCart.map((item: CartItem) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
    toast({
      title: 'Updated quantity',
      description: `Quantity set to ${quantity}`,
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartCount = () => {
    return cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
  }

  const getSubtotal = () => {
    return cart.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0)
  }

  const isInCart = (productId: number) => {
    return cart.some((item: CartItem) => item.product.id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getSubtotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
