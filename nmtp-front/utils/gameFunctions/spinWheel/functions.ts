import { GameNames } from "~/utils/constants/gameNames"

export async function sendGameResult(params: {
  winLostAmount: number
  bet: number
  login: string
}) {
  return await $fetch('/api/rocket/result', {
    method: 'POST',
    body: {
      game: String(GameNames.SPIN_WHEEL.english),
      login: String(params.login),
      winLostAmount: Math.round(params.winLostAmount),
      betAmount: params.bet,
    },
  })
}