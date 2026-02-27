 'use client'

import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'

export default function WishlistPage() {
  const { addToCart, getCartCount } = useCart()
  const { wishlist, removeFromWishlist, getWishlistCount } = useWishlist()

  const [loadingId, setLoadingId] = useState<number | null>(null)

  const handleAddToCart = async (item: typeof wishlist[0]) => {
    setLoadingId(item.id)
    addToCart(item)
    // small UX delay
    await new Promise((r) => setTimeout(r, 250))
    removeFromWishlist(item.id)
    setLoadingId(null)
  }

  return (
    <>
      <Navbar cartCount={getCartCount()} wishlistCount={getWishlistCount()} />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Wishlist</h1>

          {wishlist.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="No items in your wishlist"
              description="Add products to your wishlist to save them for later"
              actionLabel="Explore Products"
              actionHref="/"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {wishlist.map(item => (
                <div
                  key={item.id}
                  className="bg-card rounded-lg border border-border overflow-hidden flex flex-col"
                >
                  <Link href={`/products/${item.id}`} className="relative h-48 overflow-hidden bg-secondary block">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  <div className="flex flex-col flex-1 p-4">
                    <Link href={`/products/${item.id}`} className="group">
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(item)}
                        size="sm"
                        className="w-full"
                        isLoading={loadingId === item.id}
                        disabled={loadingId === item.id}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Heart className="h-4 w-4 mr-2 fill-current" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
