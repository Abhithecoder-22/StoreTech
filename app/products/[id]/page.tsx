'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { QuantitySelector } from '@/components/quantity-selector'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { Product } from '@/types'
import { fetchProduct } from '@/lib/api'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [productId, setProductId] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isWishlistProcessing, setIsWishlistProcessing] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const { addToCart, getCartCount, isInCart, removeFromCart } = useCart()
  const { toggleWishlist, isInWishlist, getWishlistCount } = useWishlist()

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params
      setProductId(resolvedParams.id)
    }
    unwrapParams()
  }, [params])

  useEffect(() => {
    if (!productId) return

    async function loadProduct() {
      try {
        const data = await fetchProduct(productId as string)
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  if (loading) {
    return (
      <>
        <Navbar cartCount={0} wishlistCount={0} />
        <main className="bg-background min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="h-96 bg-card rounded-lg border border-border animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 bg-card rounded animate-pulse w-3/4" />
                <div className="h-6 bg-card rounded animate-pulse w-1/2" />
                <div className="h-20 bg-card rounded animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Navbar cartCount={getCartCount()} wishlistCount={getWishlistCount()} />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {error || 'Product not found'}
            </h1>
            <Link href="/">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  const handleAddToCart = () => {
    // left as synchronous logic in context but show a brief loader for UX
    (async () => {
      setIsProcessing(true)
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
        // small delay so user sees the loader when adding multiple
        // keep minimal to avoid slowing real flow
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 150))
      }
      setQuantity(1)
      setIsProcessing(false)
    })()
  }

  const handleToggleWishlist = () => {
    setIsWishlistProcessing(true)
    toggleWishlist(product)
    setTimeout(() => setIsWishlistProcessing(false), 250)
  }

  const handleRemoveFromCart = () => {
    setIsRemoving(true)
    removeFromCart(product.id)
    setTimeout(() => setIsRemoving(false), 250)
  }

  return (
    <>
      <Navbar cartCount={getCartCount()} wishlistCount={getWishlistCount()} />
      <main className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-center justify-center bg-secondary rounded-lg overflow-hidden h-96">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="text-sm font-semibold text-primary bg-secondary px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">{product.rating.rate.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">
                      ({product.rating.count} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8">
                  {product.description}
                </p>

                <div className="bg-card border border-border rounded-lg p-4 mb-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Free Shipping</div>
                      <div className="text-sm text-muted-foreground">On orders over $100</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">2-Year Warranty</div>
                      <div className="text-sm text-muted-foreground">Full coverage included</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-foreground">Quantity:</span>
                    <QuantitySelector
                      quantity={quantity}
                      onQuantityChange={setQuantity}
                      maxStock={99}
                    />
                  </div>

                  {isInCart(product.id) ? (
                    <Button onClick={handleRemoveFromCart} size="lg" className="w-full" isLoading={isRemoving}>
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button onClick={handleAddToCart} size="lg" className="w-full" isLoading={isProcessing}>
                      Add to Cart
                    </Button>
                  )}

                  <Button
                    variant={isInWishlist(product.id) ? 'secondary' : 'outline'}
                    onClick={handleToggleWishlist}
                    className="w-full"
                    isLoading={isWishlistProcessing}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
