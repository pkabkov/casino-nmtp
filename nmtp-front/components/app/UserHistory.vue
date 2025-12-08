<script lang="ts" setup>
import { ref } from 'vue'

const games = [
  {
    name: 'Сапер',
    totalGames: 25,
    spending: 5000,
    winnings: 6200,
    history: [
      { date: '2025-10-28', score: 450 },
      { date: '2025-10-25', score: -320 },
      { date: '2025-10-25', score: -320 },
      { date: '2025-10-25', score: -320 },
      { date: '2025-10-25', score: -320 },
      { date: '2025-10-25', score: 300 },
      { date: '2025-10-25', score: -320 },
      { date: '2025-10-25', score: -320 },
      { date: '2025-10-25', score: -320 },
      { date: '2025-10-22', score: -180 }
    ]
  },
  {
    name: 'Ракета',
    totalGames: 3,
    spending: 310,
    winnings: 960,
    history: [
      { date: '2025-10-29', score: 550 },
      { date: '2025-10-27', score: -290 },
      { date: '2025-10-24', score: 410 }
    ]
  },
  {
    name: 'Крути барабан',
    totalGames: 0,
    spending: 0,
    winnings: 0,
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
          <span>Всего игр:</span>
          <span class="stat-value">{{ selectedGame.totalGames }}</span>
        </div>
        <div class="stat-row">
          <span>Выигрыш:</span>
          <span class="stat-value">{{ selectedGame.winnings }}</span>
        </div>
        <div class="stat-row">
          <span>Траты:</span>
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
