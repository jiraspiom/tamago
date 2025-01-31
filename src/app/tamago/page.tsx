'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [status, setStatus] = useState({
    hunger: 50,
    happiness: 50,
    energy: 50,
  })

  useEffect(() => {
    const internal = setInterval(fetchStatus, 5000)
    return () => clearInterval(internal)
  }, [])

  const fetchStatus = async () => {
    const res = await fetch('http://localhost:3069/status', { method: 'GET' })
    const data = await res.json()
    setStatus(data)
  }

  const sendAction = async (action: string) => {
    await fetch(`http://localhost:3069/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    fetchStatus()
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2x1 font-bold">meu tamago</h1>

      <p>🍖 Fome: {status.hunger}</p>
      <p>😊 Felicidade: {status.happiness}</p>
      <p>💤 Energia: {status.energy}</p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => sendAction('feed')}
          className="p-2 bg-green-500 text-white rounded"
        >
          Alimentar 🍖
        </button>

        <button
          type="button"
          onClick={() => sendAction('play')}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Brincar 🎾
        </button>

        <button
          type="button"
          onClick={() => sendAction('sleep')}
          className="p-2 bg-purple-500 text-white rounded"
        >
          Dormir 🛌
        </button>
      </div>
    </div>
  )
}
