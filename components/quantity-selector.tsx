import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  maxStock: number
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  maxStock,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrement = () => {
    if (quantity < maxStock) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="flex items-center gap-2 border border-border rounded-lg p-1 bg-secondary">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="h-8 w-8 p-0"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="flex-1 text-center font-medium text-foreground w-12">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrement}
        disabled={quantity >= maxStock}
        className="h-8 w-8 p-0"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
