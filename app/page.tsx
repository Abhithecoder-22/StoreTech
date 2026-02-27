'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { ProductCard } from '@/components/product-card'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { Product } from '@/types'
import { fetchProducts } from '@/lib/api'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const { addToCart, getCartCount, isInCart } = useCart()
  const { toggleWishlist, isInWishlist, getWishlistCount } = useWishlist()

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar cartCount={0} wishlistCount={0} />
        <main className="bg-background min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-card rounded-lg border border-border animate-pulse"
                />
              ))}
            </div>
          </div>
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar cartCount={0} wishlistCount={0} />
        <main className="bg-background min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar cartCount={getCartCount()} wishlistCount={getWishlistCount()} />
      <main className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground text-balance">
              Premium Tech Products
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Discover our curated selection of cutting-edge electronics and accessories
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={toggleWishlist}
                isInWishlist={isInWishlist(product.id)}
                isInCart={isInCart(product.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
