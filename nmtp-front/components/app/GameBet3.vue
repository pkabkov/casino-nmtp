<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps<{
  balance: number
  win?: boolean | null
  wonLostAmount?: number | null
  gameCoef?: number | null
  overlay: boolean
}>()

const betAmount = ref<number | null>(null)

const emit = defineEmits(['submit', 'show-descr', 'collect'])

const showResultButton = ref()
const wonPrize = ref(false)

watch(
  () => props.win || wonPrize.value,
  async (val) => {
    if (val) {
      showResultButton.value = false
      wonPrize.value = false
      await nextTick()
      showResultButton.value = true

      setTimeout(() => {
        showResultButton.value = false
      }, 1000)
    }
  }
)

const resultButtonText = computed(() => {
  return `Вы ${props.win ? 'проиграли' : 'выиграли'} ${props.wonLostAmount != null ? props.wonLostAmount : betAmount.value}`
})

const resultButtonClass = computed(() => {
  return props.win ? 'btn--lost' : 'btn--won'
})

const isChecked = ref();

const isPlayDisabled = computed(() => {
  if (isChecked.value) {
    if (betAmount.value != null && betAmount.value > 0) return false
    return true
  }
  if (betAmount.value != null && betAmount.value < props.balance && betAmount.value > 0) return false
  return true
})

const isBetDisabled = computed(() => {
  return !props.overlay
})

function submitForm() {
  if (isPlayDisabled.value) return
  wonPrize.value = false
  emit('submit', betAmount.value)
}



function takeMoney() {
  wonPrize.value = true
  emit('collect', {
    
  })
}

function showDescr(){
  emit('show-descr')
}
function limitLength(event) {
  let value = event.target.value;
  const maxLength = 10;
  if (value.length > maxLength) {
    value = value.slice(0, maxLength);
    betAmount.value = value;
  }
}

const ishiddenResult = ref(true)

function hideResult() {
  ishiddenResult.value = true
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
                  onkeydown="return event.key !== '-' && event.key !== '.'"
                  placeholder="0"
                  @input="limitLength"
                  class="bet-input"
                  :disabled="isBetDisabled"
                  @click="hideResult"
                />
              </div>
            </div>
          </div>

          <div class="table-cell">
            <div class="table-half-header">
              <div class="table-cell">Коэффициент</div>
              <div class="coef-wrapper">
                <span class="coef-prefix">x</span>
                <label class="coef-input">{{props.win ? 1 : props.gameCoef}}</label>
              </div>
            </div>
          </div>
      </div>

      <div class="table-row">
        <button v-if="overlay === true"
          class="btn"
          type="submit"
          @click="submitForm"
          :disabled="isPlayDisabled"
        >
          Играть
        </button>
        <button v-if="overlay === false"
          class="btn"
          type="submit"
          @click="takeMoney"
        >
          Забрать {{props.wonLostAmount != null ? props.wonLostAmount : betAmount}}
        </button>
        <button class="btn btn--secondary" @click="showDescr">Подробнее</button>
      </div>

      <div v-if="overlay === true" class="table-row">
        <div class="demo-cell">
                <label>Демо игра:</label>
                <label class="switch">
                    <input type="checkbox" v-model="isChecked">
                    <span class="slider"></span>
                </label>
            </div>
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
  </div>
</template>


<style scoped>

button:disabled {
  cursor: default;
  opacity: 0.5;
  pointer-events: none;
}

.demo-cell {
  display: flex;
  flex: 0.48;
  color: rgba(163, 171, 186, 1);
  font-family: 'Segoe UI', SegoeUI;
  font-weight: 600;
  font-style: normal;
  align-items: center;
  justify-content:space-between;
}

.switch {
  position: relative;
  display: inline-block;
  width: 68px;
  height: 30px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #1C1C1F;
  border-radius: 14px;
  border: 2px solid #10c5e1;
}

.switch input:checked + .slider {
  background-color: #1C1C1F;
}

.slider:before {
  position: absolute;
  content: "";
  height: 21px;
  width: 21px;
  left: 8px;
  top: 2px;
  background-color: #12384F;
  border-radius: 50%;
  transition: .2s;
}

.switch input:checked + .slider:before {
  transform: translateX(28px);
  background: #10C5E1;
}

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
  border-radius: 16px;
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
  padding: 0.3rem 1.5rem;
  gap: 1rem;

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
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(28, 28, 31, 1);
  font-size: 1.1rem;
}

.coef-prefix {
  font-family: 'Segoe UI';
  font-weight: 400;
  font-style: normal;
  font-weight: bold;
  align-items: center;
  color: rgba(16, 197, 225, 1);;
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
  border-radius: 10px;
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
  transform: translateY(-2px) scale(0.98);
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


</style>
