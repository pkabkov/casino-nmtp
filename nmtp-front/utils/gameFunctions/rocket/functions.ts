import { GameNames } from "~/utils/constants/gameNames"

export function getTimeCoef() {
  const HOUSE_EDGE = 0.04; 
  
  const r = Math.random();
  let coef = (1 - HOUSE_EDGE) / (1 - r);

  if (coef < 1.00) {
    coef = 1.00;
  }
  
  const MAX_PAYOUT = 50;
  if (coef > MAX_PAYOUT) coef = MAX_PAYOUT;
  
  let animTime = 0;
  if (coef > 1) {
      animTime = Math.log(coef) / 0.15; 
  }

  return {
    animTime: parseFloat(animTime.toFixed(2)), 
    coef: parseFloat(coef.toFixed(2)) - 1          
  };

}




export async function sendGameResult(params: {
  winLostAmount: number
  bet: number
  login: string
}) {
  return await $fetch('/api/rocket/result', {
    method: 'POST',
    body: {
      game: String(GameNames.ROCKET.english),
      login: String(params.login),
      winLostAmount: Math.round(params.winLostAmount),
      betAmount: params.bet,
    },
  })
}