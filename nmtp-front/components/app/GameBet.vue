<script setup lang="ts">

const props = defineProps<{
  balance: number,
  win?: boolean,
  wonLostAmount?: number,

}>()



const betAmount = ref()
const coefAmount = ref()

const showResultButton = computed(() => props.win != null)

const resultButtonText = computed(() => {
  if (props.win === null || props.wonLostAmount === null ) return ''
  return `Вы ${props.win ? 'выиграли' : 'проиграли'} ${props.wonLostAmount}`
})

const resultButtonClass = computed(() => {
  if (props.win == null) return 'btn--undefined'
  return props.win ? 'btn--won' : 'btn--lost'
})
const emit = defineEmits(['submit'])

function submitForm(){
  emit('submit',
    {
      bet: betAmount.value,
      coef: coefAmount.value
    }
  )
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
              />
              </div>
            </div>
          </div>
          <div class="table-cell">
            <div class="table-half-header">
              <div class="table-cell">Коэфициент</div>
              <div class="coef-wrapper">
                <span class="coef-prefix">x</span>
                <input 
                  v-model="coefAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  class="coef-input"
                />
              </div>
            </div>
          </div>
      </div>

      <div class="table-row">
        <button class="btn" type="submit" @click="submitForm" >Играть</button>
        <button class="btn btn--secondary">Подробнее</button>
      </div>
      <div class="table-row">
        <button
            v-if="showResultButton"
            class="btn result-btn"
            :class="resultButtonClass"
          >
            {{ resultButtonText}}
          </button>
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
