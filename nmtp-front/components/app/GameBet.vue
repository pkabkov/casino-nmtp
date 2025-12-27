<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  balance?: number | null
  win?: boolean | null
  // wonLostAmount?: number | null
  bet?: number | null
  isAnimating?: boolean
  currentMultiplier?: string | null
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
  return (props.bet * multiplier).toFixed(0)
})

const betAmount = ref<number | null>(null)
const coefAmount = ref<number | null>(null)

const emit = defineEmits(['submit', 'show-descr', 'cash-out'])


const showResultButton = computed(() => {
  //В самом начале показывается ненадолго, надо убрать
  return props.bet != null && !props.isAnimating && props.currentMultiplier !== "0.00"
})

const resultButtonText = computed(() => {
  // if (props.isAnimating || props.bet == null) return ''
  return `Вы ${props.win ? 'выиграли' : 'проиграли'} ${currentWinAmount.value}`
})

const resultButtonClass = computed(() => {
  if (props.win == null) return 'btn--undefined'
  return props.win ? 'btn--won' : 'btn--lost'
})

const isPlayDisabled = computed(() => {
  
  if(props.isAnimating){
    return props.currentMultiplier === "0.00"
  }

  return (
    !betAmount.value ||
    betAmount.value <= 0 
    // ||
    // !coefAmount.value ||
    // coefAmount.value <= 0
  )
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
        <button
          class="btn"
          type="submit"
          @click="submitForm"
          :disabled="isPlayDisabled"
          :style="{ opacity: isPlayDisabled ? 0.5 : 1,}"
        >
           {{ isAnimating && betAmount && currentMultiplier 
            ? `Забрать ${currentWinAmount}` 
            : 'Играть' 
          }}
        </button>

        <button class="btn btn--secondary" @click="showDescr">Подробнее</button>
      </div>

      <div class="table-row">
        <button
            v-if="showResultButton"
            class="btn result-btn"
            :class="resultButtonClass"
        >
          {{ resultButtonText }}
        </button>
      </div>
      <div class="table-row">
        <AppSlider />
      </div>
  </div>
</template>


<style scoped>
.table-half-header{
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.2rem;
}
.bet-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(16, 197, 225, 1);
  background-color: rgba(18, 56, 79, 1);
  font-family: 'Segoe UI', SegoeUI;
  font-weight: 400;
  font-style: normal;
  padding: 0.5rem 0rem;
  gap: 0.5rem;
}

.table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 1.5rem;
  gap: 1rem;
  flex: 1;
}

.table-cell {
  flex: 1;
  text-align: left;
  min-width: 0;
  color: rgba(163, 171, 186, 1);
  font-family: 'Segoe UI', SegoeUI;
  font-weight: 400;
  font-style: normal;
  
}

.bet-input:focus,
.coef-input:focus {
  outline: none;
  box-shadow: none;
  border-color: #ccc;
}

.coef-input {
  width: 100%;
  text-align: left;
  font-size: 1rem;
  border: none;
  background: transparent;
  color: rgba(16, 197, 225, 1);
  font-family: 'Segoe UI', SegoeUI;
  font-weight: 400;
  font-style: normal;
  font-weight: bold;

}
.bet-input {
  width: 100%;
  text-align: left;
  font-size: 16px;
  box-sizing: border-box;
  border: none;
  background: transparent;
  color: rgba(163, 171, 186, 1);
  font-family: 'Segoe UI', SegoeUI;
  font-weight: 400;
  font-style: normal;
}

.coef-wrapper{
  padding: 0.4rem 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(28, 28, 31, 1);
  font-size: 1.1rem;
  color: rgba(16, 197, 225, 1);
  font-weight: bold;
}

.coef-prefix {
  font-family: 'Segoe UI';
  font-weight: 400;
  font-style: normal;
  font-weight: bold;
  align-items: center;
  color: rgba(16, 197, 225, 1);
}

.bet-input::-webkit-inner-spin-button,
.bet-input::-webkit-outer-spin-button,
.coef-input::-webkit-inner-spin-button,
.coef-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn {
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Segoe UI';
  font-weight: 600;
  font-style: normal;
  font-size: 1.2rem;
  background: rgba(16, 197, 225, 1);
  color: rgba(28, 28, 31, 1)te;
  
}

.btn:hover {
  background: rgba(16, 197, 225, 0.4);
}



.btn--secondary {
  background: rgba(163, 171, 186, 1);
}

.btn--secondary:hover {
  background: rgba(163, 171, 186, 0.4);
}
.result-btn {
  flex: 1;
}

.btn--won {
  background-color: rgba(40, 167, 69, 0.3);
  border: 2px solid rgba(40, 167, 69, 1);
  color: rgba(40, 167, 69, 1);
  font-style: normal;
  font-weight: bold;
  cursor:auto;
}
.btn--won:hover{
  background-color: rgba(40, 167, 69, 0.3);
}

.btn--lost {
  background-color: rgba(220, 53, 69, 0.3);
  border: 2px solid rgba(220, 53, 69, 1);
  color: rgba(220, 53, 69, 1);
  font-style: normal;
  font-weight: bold;
  cursor:auto;
}
.btn--lost:hover{
  background-color: rgba(220, 53, 69, 0.3);
}
.btn--undefined{
  visibility: hidden;
}

</style>
