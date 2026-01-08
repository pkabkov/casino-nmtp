import type { BetCard } from '~/types/betCard'
export default defineEventHandler(async (event) => {
  const body = await readBody<BetCard>(event)
  const coef = 1.2
  let win = null
  const bet = body.bet
  const cell = body.cell
  const total = bet * coef
  if (cell === 1 || cell === 3 || cell === 5 || cell === 7 || cell === 9 || cell === 12 || cell === 13) win = true
  return{
    win: win,
    balance: 1000000,
    message: 'good game',
    coef: coef,
    wonLostAmount: Math.round(total)
  }
})