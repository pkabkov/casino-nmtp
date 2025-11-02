<script lang="ts" setup>
import { ref } from 'vue'

const games = [
  {
    name: 'Игра 1',
    totalGames: 25,
    spending: 5000,
    winnings: 6200,
    history: [
      { date: '2025-10-28', score: 450 },
      { date: '2025-10-25', score: -320 },
      { date: '2025-10-22', score: -180 }
    ]
  },
  {
    name: 'Игра 2',
    totalGames: 18,
    spending: 3600,
    winnings: 4100,
    history: [
      { date: '2025-10-29', score: 550 },
      { date: '2025-10-27', score: -290 },
      { date: '2025-10-24', score: 410 }
    ]
  },
  {
    name: 'Игра 3',
    totalGames: 31,
    spending: 6200,
    winnings: 5800,
    history: [
    //   { date: '2025-10-30', score: 380 },
    //   { date: '2025-10-26', score: 470 },
    //   { date: '2025-10-23', score: 210 }
    ]
  }
]

const selectedGame = ref(games[0]!) // ! Добавлен чтобы ts не помечал selectedGame.name как возможный undefined
</script>

<template>
  <div class="user-history">
    <div class="game-header-row">
      <button 
        v-for="game in games" 
        :key="game.name"
        class="game-button"
        :class="{ active: selectedGame.name === game.name }"
        @click="selectedGame = game"
      >
        {{ game.name }}
      </button>
    </div>

    <div class="game-content">
      <div class="stats-column">
        <div class="column-header">Информация:</div>
        <div class="stat-row">
          <span class="stat-label">Всего игр:</span>
          <span class="stat-value">{{ selectedGame.totalGames }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Выигрыш:</span>
          <span class="stat-value">{{ selectedGame.winnings }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Траты:</span>
          <span class="stat-value">{{ selectedGame.spending }}</span>
        </div>
      </div>

      <div class="stats-column">
        <div class="column-header">История игр:</div>
        <div v-if="selectedGame.history.length > 0">
            <div class="existing-history">
                <div 
                    v-for="entry in selectedGame.history" 
                    :key="entry.date" 
                    class="stat-row"
                >
                    <span class="stat-label">{{ entry.date }}:</span>
                    <span 
                        class="stat-value"
                        :class="entry.score >= 0 ? 'positive' : 'negative'"
                        >
                            {{ entry.score > 0 ? '+' : '' }}{{ entry.score }}

                        </span>
                
                </div>
            </div>
        </div>
        <div v-else class="empty-history">
            История пуста
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-history {
  flex: 1;
  padding: 1.5rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.positive {
  color: #2ecc71; 
  
}
.existing-history{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

}

.negative {
  color: #e74c3c; 
  
}


.game-header-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.game-button {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.6rem 1.25rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;
}

.game-button:hover {
  background-color: #e7e7e7;
}

.game-button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.game-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10rem;
  border: 1px solid #007bff;
}

.stats-column {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 0.5rem;
  min-width: 160px;
  border: 1px solid #d862e0;
}

.stat-row {
  width: 100%;
  display: flex;
  justify-content:flex-start;
  font-size: 0.95rem;
  border: 1px solid #4233e6;
  gap: 1rem;
}
.empty-history{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border: 1px solid #0ce626;
}

.stat-label {
  font-weight: 600;
  color: #555;
}

.stat-value {
  font-weight: 600;
}

.history-column {
  flex: 1;
}

.column-header {
  font-weight: 600;
  color: #555;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
}

.history-entry {
  color: #666;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.25rem;
}
</style>
