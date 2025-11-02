import type { User } from '~/types/user'
import type { GameRecord } from '~/types/game'
import type { GameHistory } from '~/types/gameHistory'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, message: 'User ID is required' })
  }

  // Static dates: last 10 games for each, from 2025-10-19 to 2025-11-01
  const staticDates = [
    '2025-10-19',
    '2025-10-20',
    '2025-10-22',
    '2025-10-24',
    '2025-10-25',
    '2025-10-27',
    '2025-10-29',
    '2025-10-30',
    '2025-10-31',
    '2025-11-01'
  ]

  // Reuse same date sequence for all games (chronological, latest last)
  const game1History: GameRecord[] = [
    { date: staticDates[0], score: 150 },
    { date: staticDates[1], score: -200 },
    { date: staticDates[2], score: 300 },
    { date: staticDates[3], score: -50 },
    { date: staticDates[4], score: 400 },
    { date: staticDates[5], score: -100 },
    { date: staticDates[6], score: 250 },
    { date: staticDates[7], score: -300 },
    { date: staticDates[8], score: 100 },
    { date: staticDates[9], score: -150 }
  ]

  const game2History: GameRecord[] = [
    { date: staticDates[0], score: -400 },
    { date: staticDates[1], score: 200 },
    { date: staticDates[2], score: -150 },
    { date: staticDates[3], score: 350 },
    { date: staticDates[4], score: -50 },
    { date: staticDates[5], score: 450 },
    { date: staticDates[6], score: -200 },
    { date: staticDates[7], score: 100 },
    { date: staticDates[8], score: -300 },
    { date: staticDates[9], score: 250 }
  ]

  const game3History: GameRecord[] = [
    { date: staticDates[0], score: 300 },
    { date: staticDates[1], score: -100 },
    { date: staticDates[2], score: 400 },
    { date: staticDates[3], score: -200 },
    { date: staticDates[4], score: 150 },
    { date: staticDates[5], score: -50 },
    { date: staticDates[6], score: 500 },
    { date: staticDates[7], score: -300 },
    { date: staticDates[8], score: 200 },
    { date: staticDates[9], score: -150 }
  ]

  const games: GameHistory[] = [
    {
      name: 'Игра1',
      played: 32,
      spent: 480,
      won: 1050,
      history: game1History
    },
    {
      name: 'Игра2',
      played: 28,
      spent: 520,
      won: 950,
      history: game2History
    },
    {
      name: 'Игра3',
      played: 30,
      spent: 500,
      won: 1000,
      history: game3History
    }
  ]

  // Calculate totals
  const totalPlayed = games.reduce((sum, g) => sum + g.played, 0)
  const totalSpent = games.reduce((sum, g) => sum + g.spent, 0)
  const totalWon = games.reduce((sum, g) => sum + g.won, 0)
  const totalScore = totalWon - totalSpent

  // Static favorite game: Игра1 has most plays (32)
  const faveGame = 'Игра1'
  const playedFave = 32

  // Static leaderboard place
  const place = 7

  const user: User = {
    id,
    score: totalScore,
    place,
    spent: totalSpent,
    won: totalWon,
    played: totalPlayed,
    faveGame,
    playedFave,
    games
  }

  return user
})