'use client'

import { ReactNode } from 'react'
import { CartProvider } from './cart-context'
import { WishlistProvider } from './wishlist-context'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <Toaster />
      </WishlistProvider>
    </CartProvider>
  )
}
