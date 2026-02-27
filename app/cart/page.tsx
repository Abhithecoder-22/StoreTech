'use client'

import { ShoppingCart } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { CartItemCard } from '@/components/cart-item-card'
import { OrderSummary } from '@/components/order-summary'
import { EmptyState } from '@/components/empty-state'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartCount, getSubtotal } = useCart()
  const { getWishlistCount } = useWishlist()

  const subtotal = getSubtotal()
  const tax = subtotal * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const itemCount = getCartCount()

  return (
    <>
      <Navbar cartCount={itemCount} wishlistCount={getWishlistCount()} />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

          {cart.length === 0 ? (
            <EmptyState
              icon={ShoppingCart}
              title="Your cart is empty"
              description="Add some products to get started with your shopping"
              actionLabel="Continue Shopping"
              actionHref="/"
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <CartItemCard
                    key={item.product.id}
                    item={item}
                    onQuantityChange={(quantity) =>
                      updateQuantity(item.product.id, quantity)
                    }
                    onRemove={() => removeFromCart(item.product.id)}
                  />
                ))}
              </div>

              <div>
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  itemCount={itemCount}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
