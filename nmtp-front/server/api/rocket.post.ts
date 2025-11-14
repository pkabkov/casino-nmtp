import type { RocketBetCard } from '~/types/rocketBetCard'
export default defineEventHandler(async (event) => {
  const body = await readBody<RocketBetCard>(event)
  return{
    win: true,
    balance: 1000,
    message: 'you won',
    animTime: 10,
    coef: 3.1,
    wonLostAmount: body.bet
  }
})