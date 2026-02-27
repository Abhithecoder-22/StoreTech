'use client'

import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  cartCount: number
  wishlistCount: number
}

export function Navbar({ cartCount, wishlistCount }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ST</span>
            </div>
            <span className="text-lg font-semibold text-foreground">StoreTech</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="relative gap-2">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative gap-2">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
