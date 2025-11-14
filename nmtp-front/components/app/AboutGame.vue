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
                <div class="close-icon">
                    <img src="@/assets/images/closeIcon.png" @click="closeModal"></img>
                </div>
            </div>
            <div>
                <p class="description">{{ game.description }}</p>
                <button class="play-btn" @click="play">Играть сейчас</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #12384F;
  padding: 26px 0px;
  border-radius: 16px;
  border: 2px solid #10C5E1;
  width: 432px;
  max-width: 90vw;
  overflow: hidden;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 380px;
  height: 46px;
}

.title {
  font-size: 32px;
  font-weight: 600;
  color: #10C5E1;
  margin: 0;
  line-height: 100%;
}

.close-icon {
  cursor: pointer;
  align-self: flex-start;
}

.description {
    vertical-align: middle;
}

.modal div:not(.header-row .close-icon) {
  color: #A3ABBA;
  font-size: 24px;
  font-weight: 400;
  line-height: 100%;
  width: 380px;
}

.play-btn {
  width: 380px;
  height: 50px;
  background: #10C5E1;
  color: #1C1C1F;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}

</style>