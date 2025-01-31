import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import {
  Heart,
  Pizza,
  Moon,
  Activity,
  Clock,
  AlertTriangle,
} from 'lucide-react'

import FoodMenu from './FoodMenu'
import GameMenu from './GameMenu'
import { EVOLUTION_THRESHOLDS } from '@/constants/tamago'
import type {
  TamagotchiStats,
  TamagotchiStage,
  Food,
  Game,
} from '@/types/tamago'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

export default function Tamago() {
  const [stats, setStats] = useState<TamagotchiStats>({
    hunger: 100,
    happiness: 100,
    energy: 100,
    health: 100,
    age: 0,
  })
  const [stage, setStage] = useState<TamagotchiStage>('Egg')
  const [isSleeping, setIsSleeping] = useState(false)

  const updateStat = useCallback(
    (stat: keyof TamagotchiStats, value: number) => {
      setStats(prev => ({
        ...prev,
        [stat]: Math.max(0, Math.min(100, prev[stat] + value)),
      }))
    },
    []
  )

  useEffect(() => {
    const timer = setInterval(() => {
      if (stage !== 'Dead') {
        if (!isSleeping) {
          updateStat('hunger', -2)
          updateStat('happiness', -1)
          updateStat('energy', -1)
          updateStat(
            'health',
            stats.hunger > 50 && stats.happiness > 50 ? 1 : -1
          )
          updateStat('age', 0.1)
        } else {
          updateStat('energy', 5)
        }

        // Check for death conditions
        if (stats.hunger <= 0 || stats.health <= 0) {
          setStage('Dead')
          playSound('death')
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isSleeping, stats, updateStat, stage])

  useEffect(() => {
    if (stage !== 'Dead') {
      if (stats.age >= EVOLUTION_THRESHOLDS.Adult) setStage('Adult')
      else if (stats.age >= EVOLUTION_THRESHOLDS.Teen) setStage('Teen')
      else if (stats.age >= EVOLUTION_THRESHOLDS.Child) setStage('Child')
      else if (stats.age >= EVOLUTION_THRESHOLDS.Baby) setStage('Baby')
    }
  }, [stats.age, stage])

  const feed = (food: Food) => {
    if (stage !== 'Dead') {
      updateStat('hunger', food.hungerIncrease)
      updateStat('happiness', food.happinessIncrease)
      playSound('eat')
    }
  }

  const play = (game: Game) => {
    if (stage !== 'Dead') {
      updateStat('happiness', game.happinessIncrease)
      updateStat('energy', -game.energyDecrease)
      playSound('play')
    }
  }

  const sleep = () => {
    if (stage !== 'Dead') {
      setIsSleeping(!isSleeping)
      playSound(isSleeping ? 'wake' : 'sleep')
    }
  }

  const playSound = (sound: string) => {
    // const audio = new Audio(`/sounds/${sound}.mp3`)
    const audio = new Audio(`/sounds/${sound}.m4a`)
    audio.play()
  }

  const getEmotion = () => {
    if (stage === 'Dead') return '💀'
    const average =
      (stats.hunger + stats.happiness + stats.energy + stats.health) / 4
    if (average > 70) return '😄'
    if (average > 40) return '😐'
    return '😢'
  }

  const isDanger = (value: number) => value <= 20

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Tamago ({stage})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-9xl mb-4 text-center">
          {isSleeping ? '😴' : getEmotion()}
        </div>
        <div className="space-y-4 mb-4">
          <div className="flex items-center">
            <Pizza
              className={`mr-2 ${isDanger(stats.hunger) ? 'text-red-500' : ''}`}
            />
            <Progress
              value={stats.hunger}
              className={`flex-grow ${isDanger(stats.hunger) ? 'text-red-500' : ''}`}
            />
          </div>
          <div className="flex items-center">
            <Heart
              className={`mr-2 ${isDanger(stats.happiness) ? 'text-red-500' : ''}`}
            />
            <Progress
              value={stats.happiness}
              className={`flex-grow ${isDanger(stats.happiness) ? 'text-red-500' : ''}`}
            />
          </div>
          <div className="flex items-center">
            <Moon
              className={`mr-2 ${isDanger(stats.energy) ? 'text-red-500' : ''}`}
            />
            <Progress
              value={stats.energy}
              className={`flex-grow ${isDanger(stats.energy) ? 'text-red-500' : ''}`}
            />
          </div>
          <div className="flex items-center">
            <Activity
              className={`mr-2 ${isDanger(stats.health) ? 'text-red-500' : ''}`}
            />
            <Progress
              value={stats.health}
              className={`flex-grow ${isDanger(stats.health) ? 'text-red-500' : ''}`}
            />
          </div>
          <div className="flex items-center">
            <Clock className="mr-2" />
            <span>Age: {Math.floor(stats.age)}</span>
          </div>
        </div>
        {stage === 'Dead' ? (
          <div className="text-center text-red-500">
            <AlertTriangle className="mx-auto mb-2" size={48} />
            <p className="text-xl font-bold">Your Tamagotchi has died!</p>
          </div>
        ) : (
          <div className="space-y-2">
            <FoodMenu onFeed={feed} disabled={isSleeping} />
            <GameMenu onPlay={play} disabled={isSleeping} />
            <Button onClick={sleep} className="w-full">
              {isSleeping ? 'Wake Up' : 'Sleep'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
