'use client'

import Tamago from '@/components/Tamago'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Home() {
  const [key, setKey] = useState(0)

  const restartGame = () => {
    setKey(prevKey => prevKey + 1)
  }
  return (
    <main className="flex flex-1 min-h-screen flex-col items-center justify-center p-1 bg-gradient-to-r from-cyan-500 to-blue-500">
      <Tamago key={key} />
      <Button onClick={restartGame} className="mt-4">
        Restart Game
      </Button>
    </main>
  )
}
