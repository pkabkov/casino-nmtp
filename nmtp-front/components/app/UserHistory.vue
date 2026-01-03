<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import type { LastGames, LastGame } from '~/types/lastGames'
import type { TotalStatPerGame } from '~/types/totalStatPerGame'
import { FrontPaths } from '~/utils/constants/frontEndRoutes'
import { GameNames } from '~/utils/constants/gameNames'

const { data: sweeper, execute: executeSweeper, status: sweeperStatus } = useLazyFetch<LastGames>(
  `${FrontPaths.LAST_GAMES}/${GameNames.SWEEPER.english}`)
const { data: spinWheel, execute: executeSpinWheel, status: spinWheelStatus } = useLazyFetch<LastGames>(
  `${FrontPaths.LAST_GAMES}/${GameNames.SPIN_WHEEL.english}`)
const { data: rocket, execute: executeRocket, status: rocketStatus } = useLazyFetch<LastGames>(
  `${FrontPaths.LAST_GAMES}/${GameNames.ROCKET.english}`)

const { data: sweeperTotal, execute: executeSweeperTotal, status: sweeperTotalStatus } = useLazyFetch<TotalStatPerGame>(
  `${FrontPaths.TOTAL_PER_GAME}/${GameNames.SWEEPER.english}`)
const { data: spinWheelTotal, execute: executeSpinWheelTotal, status: spinWheelTotalStatus } = useLazyFetch<TotalStatPerGame>(
  `${FrontPaths.TOTAL_PER_GAME}/${GameNames.SPIN_WHEEL.english}`)
const { data: rocketTotal, execute: executeRocketTotal, status: rocketTotalStatus } = useLazyFetch<TotalStatPerGame>(
  `${FrontPaths.TOTAL_PER_GAME}/${GameNames.ROCKET.english}`)

const isLoading = computed(() => {
  return (
    sweeperStatus.value === 'pending' ||
    spinWheelStatus.value === 'pending' ||
    rocketStatus.value === 'pending' ||
    sweeperTotalStatus.value === 'pending' ||
    spinWheelTotalStatus.value === 'pending' ||
    rocketTotalStatus.value === 'pending'
  )
})

const games = computed(() => [
  {
    name: GameNames.SWEEPER,
    gameData: sweeper.value?.games ?? [],
    total: sweeperTotal.value
  },
  {
    name: GameNames.SPIN_WHEEL,
    gameData: spinWheel.value?.games ?? [],
    total: spinWheelTotal.value
  },
  {
    name: GameNames.ROCKET,
    gameData: rocket.value?.games ?? [],
    total: rocketTotal.value
  }
])

const selectedGameIndex = ref(0)
const selectedGame = computed(() => {
  return games.value[selectedGameIndex.value] ?? games.value[0] ?? {
    name: GameNames.SWEEPER,
    gameData: [],
    total: undefined
  }
})

onMounted(async () => {
  try {
    await Promise.all([
      executeSweeper(),
      executeSpinWheel(),
      executeRocket(),
      executeSweeperTotal(),
      executeSpinWheelTotal(),
      executeRocketTotal()
    ])
  } catch (err) {
    console.error('Failed fetching game data:', err)
  }

  if (!games.value[selectedGameIndex.value]) {
    selectedGameIndex.value = 0
  }
})
</script>

<template>
    <div class="user-history">
      <div v-if="isLoading" class="loading">
        Загрузка...
        <span><Icon name="tabler:loader-3" class="spin" /></span>
      </div>

      <template v-else>
        <div class="game-header-row">
          <button
            v-for="(game, idx) in games"
            :key="game.name.english ?? idx"
            class="game-button"
            :class="{ active: selectedGameIndex === idx }"
            @click="selectedGameIndex = idx"
          >
            {{ game.name.russian }}
          </button>
        </div>

        <div class="game-content">
          <div class="stats-column">
            <div class="column-header">Информация:</div>
            <div class="stat-row">
              <span>Всего игр:</span>
              <span class="stat-value">{{ selectedGame.total?.totalGames ?? 0 }}</span>
            </div>
            <div class="stat-row">
              <span>Выигрыш:</span>
              <span class="stat-value">{{ selectedGame.total?.totalWins ?? 0 }}</span>
            </div>
            <div class="stat-row">
              <span>Траты:</span>
              <span class="stat-value">{{ selectedGame.total?.totalLosses ?? 0 }}</span>
            </div>
          </div>

          <div class="stats-column">
            <div class="column-header">История игр:</div>

            <div v-if="(selectedGame.total?.totalGames ?? 0) > 0">
              <div class="existing-history">
                <div
                  v-for="(entry, index) in selectedGame.gameData"
                  :key="`${entry.date}-${index}`"
                  class="stat-row"
                >
                  <span class="stat-label">{{ entry.date }}:</span>
                  <span
                    class="stat-value"
                    :class="Number(entry.winLostAmount) > 0 ? 'positive' : 'negative'"
                  >
                    {{ Number(entry.winLostAmount) > 0 ? '+' : '' }}{{ entry.winLostAmount }}
                  </span>
                </div>
              </div>
            </div>

            <div v-else class="empty-history">
              История пуста
            </div>
          </div>
        </div>
      </template>
    </div>
</template>

<style scoped>
/* Add loading spinner animation */
.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 40px 20px;
  font-size: 18px;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>