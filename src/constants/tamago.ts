import type { Food, Game } from '@/types/tamago'

export const FOODS: Food[] = [
  { name: 'Apple', icon: '🍎', hungerIncrease: 10, happinessIncrease: 5 },
  { name: 'Pizza', icon: '🍕', hungerIncrease: 25, happinessIncrease: 15 },
  { name: 'Broccoli', icon: '🥦', hungerIncrease: 15, happinessIncrease: -5 },
  { name: 'Ice Cream', icon: '🍦', hungerIncrease: 5, happinessIncrease: 20 },
]

export const GAMES: Game[] = [
  { name: 'Ball', icon: '⚽', happinessIncrease: 15, energyDecrease: 10 },
  { name: 'Puzzle', icon: '🧩', happinessIncrease: 20, energyDecrease: 15 },
  { name: 'Dance', icon: '💃', happinessIncrease: 25, energyDecrease: 20 },
]

export const EVOLUTION_THRESHOLDS = {
  Baby: 5,
  Child: 10,
  Teen: 20,
  Adult: 35,
}
