import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface OrderSummaryProps {
  subtotal: number
  tax?: number
  shipping?: number
  itemCount: number
  isCheckoutPage?: boolean
}

export function OrderSummary({
  subtotal,
  tax = 0,
  shipping = 0,
  itemCount,
  isCheckoutPage = false,
}: OrderSummaryProps) {
  const total = subtotal + tax + shipping

  return (
    <div className="sticky top-20 bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
      
      <div className="space-y-3 border-b border-border pb-4 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
          </div>
        )}
        
        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground font-medium">${shipping.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between mb-6">
        <span className="font-semibold text-foreground">Total</span>
        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
      </div>

      {!isCheckoutPage ? (
        <Link href="/checkout" className="w-full block">
          <Button className="w-full">Proceed to Checkout</Button>
        </Link>
      ) : (
        <Button className="w-full">Place Order</Button>
      )}
    </div>
  )
}
