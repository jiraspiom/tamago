'use client'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'

export default function page() {
  const [hunger, setHunger] = useState(100)
  const [happiness, setHappiness] = useState(100)
  const [energy, setEnergy] = useState(100)

  useEffect(() => {
    const timer = setInterval(() => {
      setHunger(prev => Math.max(prev - 5, 0))
      setHappiness(prev => Math.max(prev - 3, 0))
      setEnergy(prev => Math.max(prev - 2, 0))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const feed = () => setHunger(prev => Math.min(prev + 20, 100))
  const play = () => setHappiness(prev => Math.min(prev + 15, 100))
  const sleep = () => setEnergy(prev => Math.min(prev + 30, 100))

  const getEmotion = () => {
    const average = (hunger + happiness + energy) / 3
    if (average > 70) return '😄'
    if (average > 40) return '😐'
    return '😢'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-4 text-center">Tamago</h1>
        <div className="text-9xl mb-4 text-center">{getEmotion()}</div>
        <div className="space-y-2">
          <div className="flex items-center">
            {/* <Pizza className="mr-2" /> */}
            <div className="text-2xl">🍕</div>
            <Progress value={hunger} className="flex-grow" />
          </div>
          <div className="flex items-center">
            {/* <Heart className="mr-2" /> */}
            <div className="text-2xl">❤️</div>
            <Progress value={happiness} className="flex-grow" />
          </div>
          <div className="flex items-center">
            {/* <Moon className="mr-2" /> */}
            <div className="text-2xl">💤</div>
            <Progress value={energy} className="flex-grow" color="text-red" />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          {/* <Button onClick={feed}>Alimentar</Button>
          <Button onClick={play}>Brincar</Button>
          <Button onClick={sleep}>Dormir</Button> */}

          <Button
            type="button"
            onClick={feed}
            className="p-2 text-2xl bg-green-500 h-12 w-12 text-white rounded-full"
          >
            🍖
          </Button>

          <Button
            type="button"
            onClick={play}
            className="p-2 text-2xl bg-blue-500 h-12 w-12 text-white rounded-full"
          >
            🎾
          </Button>

          <Button
            type="button"
            onClick={sleep}
            className="p-2 text-2xl bg-purple-500 h-12 w-12 text-white rounded-full"
          >
            🛌
          </Button>
        </div>
      </div>
    </div>
  )
}
