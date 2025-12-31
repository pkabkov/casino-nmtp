import { GameNames } from "~/utils/constants/gameNames"

export function getTimeCoef() {
  return {
    animTime: 12,   
    coef: 3.5       
  }
}

export async function sendGameResult(params: {
  winLostAmount: number
  bet: number
  login: string
}) {
  return await $fetch('/api/rocket/result', {
    method: 'POST',
    body: {
      game: String(GameNames.ROCKET),
      login: String(params.login),
      winLostAmount: Math.round(params.winLostAmount),
      betAmount: params.bet,
    },
  })
}