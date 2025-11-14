import type { RocketBetCard } from '~/types/rocketBetCard'
export default defineEventHandler(async (event) => {
  const body = await readBody<RocketBetCard>(event)
  const coef = body.coef
  const win = coef <= 1.1
  const bet = body.bet
  const total = win ? bet * coef : bet
  return{
    win: win,
    balance: 1000.1,
    message: 'you lost',
    animTime: 7,
    coef: 1.1,
    wonLostAmount: Math.round(total)
  }
})