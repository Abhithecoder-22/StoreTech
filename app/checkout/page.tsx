"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { OrderSummary } from '@/components/order-summary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmptyState } from '@/components/empty-state'
import { ShoppingCart, CheckCircle2 } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { toast } from '@/hooks/use-toast'
import { CheckoutFormData } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart, getCartCount, getSubtotal } = useCart()
  const { getWishlistCount } = useWishlist()
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cart.length === 0) {
      return
    }

    setIsProcessing(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    clearCart()
    setOrderComplete(true)
    toast({
      title: 'Order placed',
      description: `Your order for ${itemCount} items was successful.`,
    })
    setIsProcessing(false)
  }

  const subtotal = getSubtotal()
  const tax = subtotal * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const itemCount = getCartCount()

  if (cart.length === 0 && !orderComplete) {
    return (
      <>
        <Navbar cartCount={0} wishlistCount={getWishlistCount()} />
        <main className="bg-background min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <EmptyState
              icon={ShoppingCart}
              title="Your cart is empty"
              description="Add some products to proceed with checkout"
              actionLabel="Continue Shopping"
              actionHref="/"
            />
          </div>
        </main>
      </>
    )
  }

  if (orderComplete) {
    return (
      <>
        <Navbar cartCount={0} wishlistCount={getWishlistCount()} />
        <main className="bg-background min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-foreground mb-4">Order Placed Successfully!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been confirmed and will be shipped soon.
              </p>
              <Button onClick={() => router.push('/')} size="lg">
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar cartCount={itemCount} wishlistCount={getWishlistCount()} />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9\-\+\(\)\s]+"
                    />
                    <Input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{5}"
                    className="mt-4"
                  />
                </div>

                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">
                    Payment Information
                  </h2>

                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                      pattern="[0-9\s]{13,19}"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                      />
                      <Input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        pattern="[0-9]{3,4}"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">
                    Your payment information is secure and encrypted
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing || cart.length === 0}
                  size="lg"
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </div>

            <div>
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                itemCount={itemCount}
                isCheckoutPage
              />

              <div className="mt-6 bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.product.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground line-clamp-1">
                          {item.product.title}
                        </span>
                        <span className="font-medium text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
