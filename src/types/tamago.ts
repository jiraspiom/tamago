export type TamagotchiStage =
  | 'Egg'
  | 'Baby'
  | 'Child'
  | 'Teen'
  | 'Adult'
  | 'Dead'

export interface TamagotchiStats {
  hunger: number
  happiness: number
  energy: number
  health: number
  age: number
}

export interface Food {
  name: string
  icon: string
  hungerIncrease: number
  happinessIncrease: number
}

export interface Game {
  name: string
  icon: string
  happinessIncrease: number
  energyDecrease: number
}
