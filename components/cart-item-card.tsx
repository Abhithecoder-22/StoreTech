import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuantitySelector } from '@/components/quantity-selector'
import { CartItem } from '@/types'

interface CartItemCardProps {
  item: CartItem
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="flex gap-4 bg-card rounded-lg border border-border p-4">
      <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-semibold text-foreground mb-1">{item.product.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.product.description}</p>
        
        <div className="flex items-center gap-4 mt-auto">
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
            maxStock={99}
          />
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">
              ${item.product.price.toFixed(2)} each
            </div>
            <div className="text-lg font-bold text-primary">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-destructive hover:text-destructive hover:bg-destructive/10 self-start"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  )
}
