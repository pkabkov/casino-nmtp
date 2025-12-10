<script setup>
import { defineEmits } from 'vue'
import { useRouter, useRoute  } from 'vue-router'

const router = useRouter() 
const route = useRoute()

const props = defineProps({
    game: Object
})

const isCurrentRoute = computed(() => {
  const targetName = {
    1: 'mineSweeper',
    2: 'rocket',
    3: 'spinWheel'
  }[props.game.id]

  return route.name === targetName
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}

function play() {
    if (isCurrentRoute.value) {
    closeModal()
    return
    }
    switch (props.game.id) {
        case 1:
            router.push({ name: 'mineSweeper' })
            break;
        case 2:
            router.push({ name: 'rocket' })
            break;
        case 3:
            router.push({ name: 'spinWheel' })
            break;
        default:
            alert('Игра не найдена');
    }
}
</script>

<template>
    <div class="overlay" tabindex="0" @keydown.esc="closeModal">
        <div class="modal">
            <div class="header-row">
                <h2 class="title">{{ game.title }}</h2>
                <Icon name="tabler:square-x" class="close-icon" @click="closeModal" />
            </div>
            <div>
                <p class="description">{{ game.description }}</p>
                <ul class="rules-list">
                  <li v-for="(item, index) in game.rules" :key="index">
                    {{ item }}
                  </li>
                </ul>
                <button class="button" @click="play">Играть сейчас</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.description {
  margin-top: -1rem;
}

.rules-list {
  padding-left: 1.5rem;
}

</style>