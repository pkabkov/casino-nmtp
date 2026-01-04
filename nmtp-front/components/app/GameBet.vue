<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  balance?: number | null
  win?: boolean | null
  // wonLostAmount?: number | null
  bet?: number | null
  isAnimating?: boolean
  currentMultiplier?: string | null
  isSweeper?: boolean
  isWheel?: boolean
}>()

const currentWinAmount = computed(() => {
  // if (!props.isAnimating || !props.currentMultiplier || !props.bet) {
  //   return null
  // }
   if (!props.currentMultiplier || !props.bet) {
    return null
  }
  
  const multiplier = parseFloat(props.currentMultiplier)
  if (isNaN(multiplier)) {
    return null
  }
  if(!props.win && !props.isAnimating)
    return (props.bet).toFixed(0)
  return (props.bet * multiplier).toFixed(0)
})

const betAmount = ref<number | null>(null)
const coefAmount = ref<number | null>(null)

const emit = defineEmits(['submit', 'show-descr', 'cash-out'])


const showResultButton = computed(() => {
  //В самом начале показывается ненадолго, надо убрать
  if(props.isSweeper == true) 
    return props.bet != null && !props.isAnimating && props.win !== null
  return props.bet != null && !props.isAnimating && props.currentMultiplier !== "0.00"
})

const resultButtonText = computed(() => {
  // if (props.isAnimating || props.bet == null) return ''
  return `Вы ${props.win ? 'выиграли' : 'проиграли'} ${currentWinAmount.value}`
})

const resultButtonClass = computed(() => {
  if (props.win == null) return 'game-btn--undefined'
  return props.win ? 'game-btn--won' : 'game-btn--lost'
})

const isPlayDisabled = computed(() => {
  
  if (props.isWheel) {
    return props.isAnimating || !betAmount.value || 
    props.balance && betAmount.value && (betAmount.value > props.balance || betAmount.value < 0)
  }
  
  if (props.isSweeper){
    if (props.isAnimating) return props.currentMultiplier === "1.00"
    return !betAmount.value || props.balance && betAmount.value && (betAmount.value > props.balance || betAmount.value < 0)
  }

  if(props.isAnimating){
    return props.currentMultiplier === "0.00"
  }

  return !betAmount.value || props.balance && betAmount.value && (betAmount.value > props.balance || betAmount.value < 0)
})

function submitForm() {
  if (isPlayDisabled.value) return
  if(props.isAnimating){
    emit('cash-out', {
      bet: betAmount.value,
      totalWin: currentWinAmount.value,
    })
    return
  }
  // if(betAmount.value && props.balance) {
  //     if(betAmount.value > props.balance){
        emit('submit', {
          bet: betAmount.value,
          coef: coefAmount.value
        })
  //   }
  // }
}
function showDescr(){
  emit('show-descr')
}
</script>


<template>
  <div class="bet-table">
      <div class="table-row">
          <div class="table-cell">
            <div class="table-half-header">
              <div class="table-cell">Ставка</div>
              <div class="coef-wrapper">
                <input
                  v-model="betAmount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0"
                  class="bet-input"
                  :disabled="isAnimating"
                />
              </div>
            </div>
          </div>

          <div class="table-cell">
            <div class="table-half-header">
              <div class="table-cell">Коэффициент</div>
              <div class="coef-wrapper">
                <!-- <span class="coef-prefix">x</span> -->
                x{{ props.currentMultiplier }}
                <!-- <input 
                  v-model="coefAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  class="coef-input"
                /> -->
              </div>
            </div>
          </div>
      </div>

      <div class="table-row">
        <!-- <button
          class="game-btn"
          type="submit"
          @click="submitForm"
          :disabled="isPlayDisabled"
          :style="{ opacity: isPlayDisabled ? 0.5 : 1,}"
        >
           {{ isAnimating && betAmount && currentMultiplier 
            ? `Забрать ${currentWinAmount}` 
            : 'Играть' 
          }}
        </button> -->
        <button
          class="game-btn"
          type="submit"
          @click="submitForm"
          :disabled="isPlayDisabled"
          :style="{ opacity: isPlayDisabled ? 0.5 : 1,}"
          >
          <template v-if="isAnimating && betAmount && currentMultiplier && isWheel == false">
            <span>Забрать</span>
            <span>{{ currentWinAmount }}</span>
          </template>
          <template v-else-if="isAnimating && betAmount && currentMultiplier && isWheel">
            <span>Крутим...</span>
          </template>
          <template v-else>
            Играть
          </template>
          </button>

        <button class="game-btn game-btn--secondary" @click="showDescr">Подробнее</button>
      </div>

      <div class="table-row">
        <button
            v-if="showResultButton"
            class="game-btn result-btn"
            :class="resultButtonClass"
        >
          {{ resultButtonText }}
        </button>
      </div>
      <div class="table-row">
        <AppSlider :is-animating="props.isAnimating"/>
      </div>
  </div>
</template>
