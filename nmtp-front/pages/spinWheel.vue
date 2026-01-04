<script lang="ts" setup>
import { ref, watch } from 'vue'
import { demoGameKey } from '~/types/demoGame'
import { sendGameResult } from '~/utils/gameFunctions/spinWheel/functions'
import type { RocketBetCard } from '~/types/rocketBetCard'
import cherry from '@/assets/images/cherry.png'
import apple from '@/assets/images/apple.png'
import limon from '@/assets/images/limon.png'
import strawberry from '@/assets/images/strawberry.png'
import grape from '@/assets/images/grape.png'
import seven from '@/assets/images/seven.png'

const symbols = [
  cherry,
  apple,
  limon,
  strawberry,
  grape,
  seven,
] as const

type SymbolPath = (typeof symbols)[number]

const reels = ref<SymbolPath[]>([
  symbols[0],
  symbols[0],
  symbols[0],
])

const isSpinning = ref(false)
const bet = ref<number>(0)
const coef = ref(1)
const win = ref<boolean | null>(null)
const balance = ref(100000)
const viewGameDescription = ref(false)
const { user, session, loggedIn } = useUserSession()
const demoGame = ref(false)
const loggedOut = computed(() => !loggedIn.value)
const game = {
    id: 3,
    title: 'Крути барабан',
    description:
      'Запускай барабаны и дай удаче крутиться вместе с тобой! Собери три одинаковых символа и получи приз.',
    rules: [
      'Выбери ставку и жми «Играть».',
      'Комбинация выпадает случайно.',
      'Если выпало три одинаковых символа — забирай выигрыш!',
      'Если ничего не совпало — ставка пропадает.'
    ]
  }

watch(
  () => loggedIn.value,
  (isLoggedIn) => {
    if (!isLoggedIn) {
      demoGame.value = true
    }
  },
  { immediate: true }
)

function changeDemoStatus(){
  demoGame.value = !demoGame.value
}

provide(demoGameKey, {
  demoGame: readonly(demoGame),
  loggedOut: loggedOut,
  changeDemoStatus,
})

function getRandomSymbol(): SymbolPath {
  const idx = Math.floor(Math.random() * symbols.length)
  return symbols[idx]!
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function spin(): Promise<void> {
  if (isSpinning.value) return
  isSpinning.value = true
  const intervals: number[] = []
  for (let i = 0; i < 3; i++) {
    intervals[i] = window.setInterval(() => {
      reels.value[i] = getRandomSymbol()
    }, 100)
  }

  for (let i = 0; i < 3; i++) {
    await sleep(1000)
    clearInterval(intervals[i])
    reels.value[i] = getRandomSymbol()
  }

  isSpinning.value = false

}

function selectGame() {
  viewGameDescription.value = true
}

async function startGame({ bet: betValue, coef: coefValue }: RocketBetCard) {
  bet.value = betValue
  win.value = null
  coef.value = 1
  await spin()
  collectBet()
}

async function collectBet() {
  const finalReels = reels.value
  const firstSymbol = finalReels[0]!
  const isAllSame = finalReels.every(symbol => symbol === firstSymbol)
  if (isAllSame) {
    const coefMap: Record<string, number> = {
      [cherry]: 2,
      [apple]: 3, 
      [limon]: 5,
      [strawberry]: 10,
      [grape]: 20,
      [seven]: 50
    }
    coef.value = coefMap[firstSymbol] || 1
    win.value = true
  } else {
    coef.value = 1
    win.value = false
  }

  if (session.value && demoGame.value === false) {
    if(win.value == true) {
      const winAmount = bet.value * coef.value
      await sendGameResult({
        winLostAmount: winAmount - bet.value,
        bet: bet.value,
        login: user.value?.id,
      })
    } else {
      await sendGameResult({
        winLostAmount: -bet.value,
        bet: bet.value,
        login: user.value?.id,
      })
    }
    const userSession = useUserSession()
    await userSession.fetch()
  }
}


</script>
<template>
  <div class="main">
    <h1 class="title">Крути барабан</h1>
    <div class="game-section">
      <div class="wrapper">
        <div class="wheel">
          <div v-for="(img, i) in reels" :key="i" class="cell">
            <img :src="img">
          </div>
        </div>
        <div class="payments">
          <h2 class="sub-title">Таблица выплат</h2>
          <!-- <button class="spin-btn" @click="spin" :disabled="isSpinning">
            Играть
          </button> -->
          <div class="conditions">
            <div class="cond-col">
              <div class="condition">
                <img class="combo" src="@/assets/images/cherries.png">
                <span class="coef">x2</span>
              </div>
              <div class="condition">
                <img class="combo" src="@/assets/images/apples.png">
                <span class="coef">x3</span>
              </div>
              <div class="condition">
                <img class="combo" src="@/assets/images/limons.png">
                <span class="coef">x5</span>
              </div>
            </div>
            <div class="cond-col">
              <div class="condition">
                <img class="combo" src="@/assets/images/strawberries.png">
                <span class="coef">x10</span>
              </div>
              <div class="condition">
                <img class="combo" src="@/assets/images/grapes.png">
                <span class="coef">x20</span>
              </div>
              <div class="condition">
                <img class="combo" src="@/assets/images/sevens.png">
                <span class="coef">x50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="session != null && !demoGame">
        <AppGameBet @submit="startGame" @show-descr="selectGame"
                  :bet="bet"
                  :win="win"
                  :balance="user.balance"
                  :is-sweeper="false"
                  :is-wheel="true"
                  :current-multiplier="coef.toFixed(2)"
                  :is-animating="isSpinning" />
      </template>
      <template v-else>
        <AppGameBet @submit="startGame" @show-descr="selectGame"
                  :bet="bet"
                  :win="win"
                  :balance="balance"
                  :is-sweeper="false"
                  :is-wheel="true"
                  :current-multiplier="coef.toFixed(2)"
                  :is-animating="isSpinning" />
      </template>
      <AppAboutGame v-if="viewGameDescription === true" :game="game"  @close="viewGameDescription = false"/>
    </div>
  </div>
</template>
<style scoped>

.main {
  align-items: center;
  width: 77.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 0;
  margin: 0 auto;
}

.title {
  font-weight: bold;
  font-size: 2.25rem;
  color: #10C5E1;
  margin: 0;
}

.game-section{
  width: 77.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
}

.wrapper {
  background: #12384F;
  width: 37.75rem;
  height: 33.0625rem;
  border: 2px solid #10C5E1;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 	2.5rem;
  padding: 1.625rem;
  opacity: 1;
  position: relative;
}

.wheel {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.cell {
  width: 10.8125rem;
  height: 10.8125rem;
  border: 4px solid #10C5E1;
  border-radius: 16px;
  background: #1C1C1F;
  display: flex;
  justify-content: center;
  align-items: center; 
}

.payments {
  background: #1C1C1F;
  width: 34.5rem;
  height: 16.5rem;
  padding: 0 1.375rem;
  border: 2px solid #10C5E1;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.conditions {
  width: 31.75rem;
  height: 10.25rem;
  display: flex;
  justify-content: space-between;
}

.sub-title {
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0;
}

.cond-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.condition {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1.25rem;
  background: #12384F;
  width: 15rem;
  height: 2.75rem;
  border-radius: 0.625rem;
  align-items: center;
}

.coef {
  font-size: 1.25rem;
  font-weight: 700;
}

.combo {
  width: 4.5rem;
  height: 1.5rem;
}



</style>