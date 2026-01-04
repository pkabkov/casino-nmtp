<script lang="ts" setup>
import { ref, watch} from 'vue'
import { demoGameKey } from '~/types/demoGame'
import { sendGameResult } from '~/utils/gameFunctions/mineSweeper/functions'
import type { RocketBetCard } from '~/types/rocketBetCard'
import {GameNames} from "~/utils/constants/gameNames"

const bet = ref<number>(0)
const coef = ref(1.00)
const win = ref<boolean | null>(null)
const balance = ref<number>(100000)
const bombs = ref<number[]>([])           
const safeOpened = ref(0)                 
const maxSafeCells = 15                   
const baseCoef = 1.00
const cellsAmount = 25
const showOverlay = ref(true)
const viewGameDescription = ref(false)
const { user, session, loggedIn } = useUserSession()
const demoGame = ref(false)
const loggedOut = computed(() => !loggedIn.value)
const game = {
  id: 1, 
  title: 'Сапер',
  description: 'Описание игры'
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

let cellColors = ref<(null | string)[]>(Array(cellsAmount).fill(null))
let cellOpened = ref<boolean[]>(Array(cellsAmount).fill(false))

function openCell(index: number) {
  if (cellOpened.value[index]) return  // уже открыта
  
  cellOpened.value[index] = true
  
  if (bombs.value.includes(index)) {
    cellColors.value[index] = 'red'
    win.value = false
    showOverlay.value = true
    if (session.value && demoGame.value === false) {
      sendGameResult({
        winLostAmount: -bet.value,
        bet: bet.value,
        login: user.value?.id,
      })
      .then(() => {
        const userSession = useUserSession()
        return userSession.fetch()
      })
      .catch(err => {
        console.error('Failed to register loss:', err)
      })
    }
  } else {
    cellColors.value[index] = 'green'
    safeOpened.value++
    
    // ДИНАМИЧЕСКИЙ КОЭФ
    const safeCoef = 1 + (safeOpened.value / maxSafeCells) * 2.5  // 1 → 3.5
    coef.value = parseFloat(Math.min(safeCoef, 3.5).toFixed(2))
  }
}

// Генерация бомб при startGame
function generateBombs() {
  const newBombs = new Set<number>()
  while (newBombs.size < 10) {
    newBombs.add(Math.floor(Math.random() * 25))
  }
  bombs.value = Array.from(newBombs)
  safeOpened.value = 0
  coef.value = baseCoef
}


function selectGame() {
  viewGameDescription.value = true
}

async function startGame({ bet: betValue, coef: coefValue }: RocketBetCard) {
  generateBombs()
  cellColors = ref<(null | string)[]>(Array(cellsAmount).fill(null))
  cellOpened = ref<boolean[]>(Array(cellsAmount).fill(false))
  showOverlay.value = false
  bet.value = betValue

  win.value = true
}

async function cashOut(payload?: { bet?: number; totalWin?: string }) {
  try {
    showOverlay.value = true
    const winAmount = bet.value * coef.value
    win.value = true
    if (session.value && demoGame.value === false) {
      await sendGameResult({
        winLostAmount: winAmount - bet.value,
        bet: bet.value,
        login: user.value?.id,
      })
      const userSession = useUserSession()
      await userSession.fetch()
    }
  } catch (err) {
    console.error('cashOut error', err)
  }
}

</script>
<template>
  <div class="vertical-container-center">
    <h1 class="game-name"> {{ GameNames.SWEEPER.russian }} </h1>
    <div class="game-section">
      <div class="sweeper-container">
        <div class="sweeper-wrapper">
          <div v-for="rowIndex in 5" :key="rowIndex" class="cells-row">
            <div
              v-for="colIndex in 5"
              :key="colIndex + (rowIndex - 1) * 5"
              class="cell"
              :class="{ 
                openedGood: cellColors[(rowIndex - 1) * 5 + (colIndex - 1)] === 'green',
                openedBad: cellColors[(rowIndex - 1) * 5 + (colIndex - 1)] === 'red'
              }"
              @click="openCell((rowIndex - 1) * 5 + (colIndex - 1))"
            >
              <img v-if="cellColors[(rowIndex - 1) * 5 + (colIndex - 1)] === 'green'" class="good-pick-icon" src="@/assets/images/goodCell.svg">
              <img v-if="cellColors[(rowIndex - 1) * 5 + (colIndex - 1)] === 'red'" class="bad-pick-icon" src="@/assets/images/badCell.svg">
            </div>
          </div>
          <div v-if="showOverlay" class="overlay overlay-sweeper">
            <span class="overlay-text">Играть</span>
          </div>
        </div>
      </div>
      <AppGameBet @submit="startGame" @show-descr="selectGame" @cash-out="cashOut"
                  :bet="bet"
                  :win="win"
                  :balance="balance"
                  :is-sweeper="true"
                  :current-multiplier="coef.toFixed(2)"
                  :is-animating="!showOverlay" />
      <AppAboutGame v-if="viewGameDescription === true" :game="game"  @close="viewGameDescription = false"/>
    </div>
  </div>
</template>
