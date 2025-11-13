<script setup lang="ts">
const won = ref('lost')
const amount = ref(3)

const showResultButton = computed(() => won.value === 'won' || won.value === 'lost')

const resultButtonClass = computed(() =>
  won.value === 'won' ? 'rocketmine-btn--won' : 'rocketmine-btn--lost'
)
</script>

<template>
  <div class="bet-table">
    <!-- <div class="table-row"> -->
      <!-- <div class="table-cell">Ставка</div> -->
      <!-- <div class="table-cell">Коэфициент</div> -->
    <!-- </div> -->

    <div class="table-row">
      
        <div class="table-cell">
          <div class="table-half-header">
            <div class="table-cell">Ставка</div>
            <div class="coef-wrapper">
            <!-- <span class="coef-prefix">{{ '' }}</span> -->
            <input
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

    <div class="table-row rocketmine-actions">
      <button class="rocketmine-btn">Играть</button>
      <button class="rocketmine-btn rocketmine-btn--secondary">Подробнее</button>
    </div>
    <div class="table-row">
      <button
          v-if="showResultButton"
          class="rocketmine-btn result-btn"
          :class="resultButtonClass"
        >
          {{ 'Вы' + ' ' + (won === 'won' ? 'выиграли' : 'проиграли') + ' ' + amount}}
        </button>
    </div>

  </div>
</template>

<style scoped>
.table-half-header{
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
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
  /* text-align: center; */
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

.rocketmine-btn {
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  background: rgba(16, 197, 225, 1);
  color: rgba(28, 28, 31, 1)te;
}

.rocketmine-btn:hover {
  background: rgba(16, 197, 225, 0.4);
}



.rocketmine-btn--secondary {
  background: rgba(163, 171, 186, 1);
}

.rocketmine-btn--secondary:hover {
  background: rgba(163, 171, 186, 0.4);
}
.result-btn {
  flex: 1;
}

.rocketmine-btn--won {
  background-color: rgba(40, 167, 69, 0.3);
  border: 2px solid rgba(40, 167, 69, 1);
  color: rgba(40, 167, 69, 1);
  font-style: normal;
  font-weight: bold;
  cursor:auto;
}
.rocketmine-btn--won:hover{
  background-color: rgba(40, 167, 69, 0.3);
}

.rocketmine-btn--lost {
  background-color: rgba(220, 53, 69, 0.3);
  border: 2px solid rgba(220, 53, 69, 1);
  color: rgba(220, 53, 69, 1);
  font-style: normal;
  font-weight: bold;
  cursor:auto;
}
.rocketmine-btn--lost:hover{
  background-color: rgba(220, 53, 69, 0.3);
}

</style>
