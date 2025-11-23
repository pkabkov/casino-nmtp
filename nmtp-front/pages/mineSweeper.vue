<script lang="ts" setup>
import { ref } from 'vue'
import type { MineSweeperBet } from '~/types/mineSweeperBet'
import type { BetCard } from '~/types/betCard'


const cellsAmount = 25
const showOverlay = ref(true)
let cellColors = ref<(null | string)[]>(Array(cellsAmount).fill(null))
let cellOpened = ref<boolean[]>(Array(cellsAmount).fill(false))
function openCell(index: number) {
  if (!cellOpened.value[index]) {
    cellOpened.value[index] = true
    placeBet({bet: bet.value, cell: index})
  }
}

const bet = ref()
const coef = ref(1)
const pickedCell = ref()
const win = ref<boolean | null>(null)
const balance = ref(100000)
const wonLostAmount = ref()
const game = {
  id: 1, 
  title: 'Сапер',
  description: 'Описание игры'
}
const viewGameDescription = ref(false)
function selectGame() {
  viewGameDescription.value = true
}
async function placeBet({ bet: betValue, cell: cellValue}: BetCard){
  bet.value = betValue
  pickedCell.value = cellValue
  try {
    const res = await $fetch<MineSweeperBet>('/api/mineSweeper', {
      method: 'POST',
      body: {
        bet: bet.value,
        cell: pickedCell.value,
      }
    })
    win.value = res.win
    cellColors.value[cellValue] = win.value ? 'red' : 'green'
    coef.value = res.coef
    balance.value = res.balance
    wonLostAmount.value = res.wonLostAmount
    await nextTick()
    if (win.value) {
      showOverlay.value = true
    }
  } catch (err) { }
}

function startGame(betValue : number) {
  cellColors = ref<(null | string)[]>(Array(cellsAmount).fill(null))
  cellOpened = ref<boolean[]>(Array(cellsAmount).fill(false))
  showOverlay.value = false
  bet.value = betValue
  win.value = null
  coef.value = 1
}

function collectBet() {
  showOverlay.value = true
  win.value = null
  coef.value = 1
  wonLostAmount.value = null
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
      <AppGameBet3 @submit="startGame" @show-descr="selectGame" @collect="collectBet"
                  :won-lost-amount="wonLostAmount" 
                  :win="win" 
                  :balance="balance"
                  :game-coef="coef"
                  :overlay="showOverlay"
                  :counter="counterPickedCells" />
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