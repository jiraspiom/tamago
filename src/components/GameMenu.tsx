import { Button } from '@/components/ui/button'
import { GAMES } from '@/constants/tamago'
import type { Game } from '@/types/tamago'

interface GameMenuProps {
  onPlay: (game: Game) => void
  disabled: boolean
}

export default function GameMenu({ onPlay, disabled }: GameMenuProps) {
  return (
    <div className="flex justify-between">
      {GAMES.map(game => (
        <Button
          key={game.name}
          onClick={() => onPlay(game)}
          disabled={disabled}
        >
          {game.icon}
        </Button>
      ))}
    </div>
  )
}
