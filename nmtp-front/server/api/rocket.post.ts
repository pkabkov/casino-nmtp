import type { RocketBetCard } from '~/types/rocketBetCard'
export default defineEventHandler(async (event) => {
  const body = await readBody<RocketBetCard>(event)
  const coef = body.coef
  const win = coef <= 1.5
  const bet = body.bet
  const total = win ? bet * coef : bet
  return{
    // win: win,
    balance: 12,
    message: 'you lost',
    animTime: 5,
    coef: 1.5,
    // wonLostAmount: Math.round(total)
  }
})