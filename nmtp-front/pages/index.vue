<script lang="js" setup>
import { ref } from 'vue'
import AboutGame from '../components/app/AboutGame.vue'
import { useRouter  } from 'vue-router'
import sweeperImg from '@/assets/images/sweeperCard.svg'
import rocketImg from '@/assets/images/rocketCard.svg'
import wheelImg from '@/assets/images/wheelCard.svg'

const router = useRouter() 

function goToRating() {
  router.push({ name: 'rating' })
}

const hoveredGameId = ref(null)

function onMouseEnter(game) {
  hoveredGameId.value = game.id
}

function onMouseLeave() {
  hoveredGameId.value = null
}

const games = [
  {
    id: 1,
    title: 'Сапер',
    description:
      'Готов испытать свою удачу? На поле 5x5 спрятаны бомбы, но среди них — твой путь к растущему коэффициенту! Открывай клетки, рискуй и забирай выигрыш, пока всё не взлетело на воздух.',
    rules: [
      'Выбери ставку и жми «Играть».',
      'Попался на бомбу — увы, ставка взорвалась.',
      'Нашёл безопасную клетку — коэффициент растёт!',
      'Остановись в любой момент и забери свой приз.'
    ],
    image: sweeperImg
  },

  {
    id: 2,
    title: 'Ракета',
    description:
      'Запускай ракету и смотри, как множитель растёт всё выше и выше! Но не заигрывайся — в любой момент ракета может рухнуть.',
    rules: [
      'Ставка выбрана? Тогда жми «Играть» и взлетаем!',
      'Коэффициент растёт, пока ракета летит.',
      'Успей забрать выигрыш до того, как ракета упадёт.'
    ],
    image: rocketImg
  },

  {
    id: 3,
    title: 'Крути барабан',
    description:
      'Запускай барабаны и дай удаче крутиться вместе с тобой! Собери три одинаковых символа и получи приз.',
    rules: [
      'Выбери ставку и жми «Играть».',
      'Комбинация выпадает случайно.',
      'Если выпало три одинаковых символа — забирай выигрыш!',
      'Если ничего не совпало — ставка пропадает.'
    ],
    image: wheelImg
  }
]

const selectedGame = ref(null)

function selectGame(game) {
  selectedGame.value = game
}

function playGame(game) {
  router.push({ name: game.id === 1 ? 'mineSweeper' : game.id === 2 ? 'rocket' : 'spinWheel' })
}

function clearHover() {
  hoveredGameId.value = null
}

</script>

<template>
  <div class="main-bg">
    <div class="main-content">
      <button class="rating-button" @click="goToRating">
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M11.5 14.501C8.18629 14.501 5.5 11.8147 5.5 8.50098V2.94542C5.5 2.53158 5.5 2.32465 5.56031 2.15896C5.66141 1.88119 5.88021 1.66239 6.15798 1.56129C6.32367 1.50098 6.5306 1.50098 6.94444 1.50098H16.0556C16.4694 1.50098 16.6763 1.50098 16.842 1.56129C17.1198 1.66239 17.3386 1.88119 17.4397 2.15896C17.5 2.32465 17.5 2.53158 17.5 2.94542V8.50098C17.5 11.8147 14.8137 14.501 11.5 14.501ZM11.5 14.501V17.501M17.5 3.50098H20C20.4659 3.50098 20.6989 3.50098 20.8827 3.5771C21.1277 3.67859 21.3224 3.87327 21.4239 4.1183C21.5 4.30207 21.5 4.53504 21.5 5.00098V5.50098C21.5 6.43095 21.5 6.89594 21.3978 7.27744C21.1204 8.31271 20.3117 9.12136 19.2765 9.39876C18.895 9.50098 18.43 9.50098 17.5 9.50098M5.5 3.50098H3C2.53406 3.50098 2.30109 3.50098 2.11732 3.5771C1.87229 3.67859 1.67761 3.87327 1.57612 4.1183C1.5 4.30207 1.5 4.53504 1.5 5.00098V5.50098C1.5 6.43095 1.5 6.89594 1.60222 7.27744C1.87962 8.31271 2.68827 9.12136 3.72354 9.39876C4.10504 9.50098 4.57003 9.50098 5.5 9.50098M6.94444 21.501H16.0556C16.301 21.501 16.5 21.302 16.5 21.0566C16.5 19.0929 14.9081 17.501 12.9444 17.501H10.0556C8.09188 17.501 6.5 19.0929 6.5 21.0566C6.5 21.302 6.69898 21.501 6.94444 21.501Z" 
            stroke="currentColor" 
            stroke-width="3" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
        Рейтинг игроков
      </button>
      <div class="games-row">
        <div 
          v-for="game in games"
          :key="game.id" 
          class="game-block"
        >
          <div 
            class="game-card"
            @mouseenter="onMouseEnter(game)"
            @mouseleave="onMouseLeave"
          >
            <img 
              :src="game.image" 
              :alt="game.title"
              class="game-image"
              v-show="hoveredGameId !== game.id"
            >
            <div class="game-buttons" v-if="hoveredGameId === game.id">
              <button class="play-btn" @click="playGame(game)">Играть</button>
              <button class="info-btn" @click="selectGame(game)">Подробнее</button>
            </div>
          </div>
          <button 
            class="game-title"
            @click="playGame(game)"
            @mouseenter="clearHover"  
          >
            {{ game.title }}
          </button>
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
