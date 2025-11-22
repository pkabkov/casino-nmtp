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
