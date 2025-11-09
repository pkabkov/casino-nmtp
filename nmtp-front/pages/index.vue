<script lang="js" setup>
import { ref } from 'vue'
import AboutGame from '../components/app/AboutGame.vue'
import { useRouter  } from 'vue-router'

const router = useRouter() 

function goToRating() {
  router.push({ name: 'rating' })
}

const games = [
  { id: 1, title: 'Сапер', description: 'Тут будет описание Сапера' },
  { id: 2, title: 'Ракета', description: 'Тут будет описание Ракеты' },
  { id: 3, title: 'Крути барабан', description: 'Тут будет описание Крути барабана' },
]

const selectedGame = ref(null)

function selectGame(game) {
  selectedGame.value = game
}

</script>

<template>
  <div class="main-bg">
    <div class="main-content">
      <button class="rating-button" @click="goToRating">
        <img class="rating-icon" src="@/assets/images/trophy.png">
        Рейтинг игроков
      </button>
      <div class="games-row">
        <div 
          v-for="game in games"
          :key="game.id" 
          class="game-block" 
          @click="selectGame(game)"
        >
          <div class="game-card"></div>
          <span class="game-title">{{ game.title }}</span>
        </div>
      </div>
      <AboutGame 
        v-if="selectedGame" 
        :game="selectedGame"
        @close="selectedGame = null" 
      />
    </div>
  </div>
</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 740px;
  padding-top: 160px;
  padding-bottom: 120px;
  gap: 120px;
  box-sizing: border-box;
}

.rating-button {
  max-width: 672px;
  width: 672px;
  height: 60px;
  border: 2px solid #10C5E1;
  border-radius: 10px;
  background: transparent;
  color: #10C5E1;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  box-sizing: border-box;
  background-color: #17323c;
  transition: background-color 0.25s, width 0.2s;
  transition: box-shadow 0.24s;
}
.rating-button:hover {
  background: rgba(18,186,240,0.12);
  box-shadow: 0 0 32px 0 #12baf088;
}

.rating-icon {
  font-size: 26px;
}

.games-row {
  max-width: 1200px;
  height: 280;
  display: flex;
  gap: 48px;
  justify-content: center;
  box-sizing: border-box;
}
.game-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  cursor: pointer;
}
.game-card {
  width: 316px;
  height: 196px;
  background: #17323c;
  border: 2px solid #10C5E1;
  border-radius: 16px;
  box-sizing: border-box;
  transition: box-shadow 0.24s;
}
.game-block:hover .game-card {
  box-shadow: 0 0 32px 0 #12baf088;
}
.game-title {
  color: #10C5E1;
  font-size: 28px;
  font-weight: bold;
  text-align: center;

}
</style>
