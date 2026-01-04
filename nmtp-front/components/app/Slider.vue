<script setup lang="ts">
import { ref, watch } from 'vue'
import { demoGameKey } from '~/types/demoGame';

const props = defineProps<{
  isAnimating: boolean
    // disable?: boolean
}>()

const emit = defineEmits<{
  demo: [value: boolean]
}>()

// const isToggled = ref(false)

const handleToggle = () => {

  // emit('demo', isToggled.value)
  // changeDemoStatus()
}

const demoGameContext = inject(demoGameKey)

if (!demoGameContext) {
  throw new Error('demoGame not provided')
}

const { demoGame, loggedOut, changeDemoStatus } = demoGameContext

const disableSlider = computed(() => props.isAnimating || loggedOut.value)

watch 
</script>

<template>
    <div class="toggle-group">
      <span>Демо игра: {{ demoGame ? 'вкл.' : 'выкл.' }}</span>
      <label class="toggle-wrapper">
        <input
            type="checkbox"
            class="toggle-checkbox"
            :disabled="disableSlider"
            :checked="demoGame"
            @change="changeDemoStatus"
          />
        <span class="toggle-slider">
          <span class="toggle-circle"></span>
        </span>
      </label>
    </div>
</template>
