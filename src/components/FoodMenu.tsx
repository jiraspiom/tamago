import { Button } from '@/components/ui/button'
import { FOODS } from '@/constants/tamago'
import type { Food } from '@/types/tamago'

interface FoodMenuProps {
  onFeed: (food: Food) => void
  disabled: boolean
}

export default function FoodMenu({ onFeed, disabled }: FoodMenuProps) {
  return (
    <div className="flex justify-between">
      {FOODS.map(food => (
        <Button
          key={food.name}
          onClick={() => onFeed(food)}
          disabled={disabled}
        >
          {food.icon}
        </Button>
      ))}
    </div>
  )
}
