'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
  isInWishlist?: boolean
  isInCart?: boolean
}

export function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist = false,
  isInCart = false,
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const router = useRouter()
  const { removeFromCart } = useCart()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    onAddToCart?.(product)
    setIsLoading(false)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlistLoading(true)
    onAddToWishlist?.(product)
    setTimeout(() => setIsWishlistLoading(false), 300)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden hover:border-accent transition-colors duration-200">
        <div className="relative h-48 bg-secondary overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors cursor-pointer"
            aria-pressed={isInWishlist}
          >
            {isWishlistLoading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <Heart
                className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
              />
            )}
          </button>
        </div>

        <div className="flex flex-col flex-1 p-4">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {product.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground">{product.rating.rate.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({product.rating.count})</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {isInCart ? (
              <Button
                className="w-full"
                size="sm"
                onClick={async (e: React.MouseEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsLoading(true)
                  await new Promise((r) => setTimeout(r, 200))
                  removeFromCart(product.id)
                  setIsLoading(false)
                }}
                isLoading={isLoading}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full"
                size="sm"
                isLoading={isLoading}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
