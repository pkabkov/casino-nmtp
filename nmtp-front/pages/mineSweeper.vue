<script lang="ts" setup>
import { ref, watch} from 'vue'
import { demoGameKey } from '~/types/demoGame'
import { sendGameResult } from '~/utils/gameFunctions/mineSweeper/functions'
import type { RocketBetCard } from '~/types/rocketBetCard'

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
    description:
      'Готов испытать свою удачу? На поле 5x5 спрятаны бомбы, но среди них — твой путь к растущему коэффициенту! Открывай клетки, рискуй и забирай выигрыш, пока всё не взлетело на воздух.',
    rules: [
      'Выбери ставку и жми «Играть».',
      'Попался на бомбу — увы, ставка взорвалась.',
      'Нашёл безопасную клетку — коэффициент растёт!',
      'Остановись в любой момент и забери свой приз.'
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
  <div class="main">
    <h1 class="title">Сапер</h1>
    <div class="game-section">
      <div class="wrapper">
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
        <div v-if="showOverlay" class="overlay">
          <span class="overlay-text">Играть</span>
        </div>
      </div>
      <template v-if="session != null && !demoGame">
        <AppGameBet @submit="startGame" @show-descr="selectGame" @cash-out="cashOut"
                    :bet="bet"
                    :win="win"
                    :balance="user.balance"
                    :is-sweeper="true"
                    :current-multiplier="coef.toFixed(2)"
                    :is-animating="!showOverlay" />
      </template>
      <template v-else>
        <AppGameBet @submit="startGame" @show-descr="selectGame" @cash-out="cashOut"
                    :bet="bet"
                    :win="win"
                    :balance="balance"
                    :is-sweeper="true"
                    :current-multiplier="coef.toFixed(2)"
                    :is-animating="!showOverlay" />
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
  border: 2px solid #10C5E1;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 2rem 0;
  opacity: 1;
  position: relative; 
}

.overlay {
  position: absolute;
  left: 0; top: 0;
  width: 100%;
  height: 100%;
  background: rgba(22, 40, 61, 0.77);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events:fill;
  border-radius: 16px;
}

.overlay-text {
  border-radius: 10px;
  color: #10374f;
  font-size: 3rem;
  font-weight: 900;
  font-family: 'Segoe UI', SegoeUI;
  color: #10C5E1;
}



.cells-row {
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  padding: 0 2rem;
}

.cell {
  width: 6.25rem;
  height: 6.25rem;
  border: 2px solid #10C5E1;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center; 
}

.cell:not(.openedGood):not(.openedBad):hover {
  background: #10C5E1;
}

.openedGood {
  background: green;
  cursor: default;
}

.openedBad {
  background: red;
  cursor: default;
}



</style>