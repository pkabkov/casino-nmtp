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
      <span>Демо игра: {{ demoGame ? 'вкл' : 'выкл' }}</span>
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


<style scoped>
.toggle-group {
  display: flex;
  width: 49%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: rgba(163, 171, 186, 1);
}

.toggle-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.toggle-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.toggle-slider {
  position: relative; 
  width: 3.5rem;
  height: 1.625rem; 
  background-color: #1C1C1F;
  border-radius: 2rem;
  border: 2px solid rgba(16, 197, 225, 1);
  flex-shrink: 0; 
  transition: background-color 0.3s;
}

.toggle-circle {
  position: absolute; 
  top: 50%;
  left: 0.2rem;
  transform: translateY(-50%); 
  width: 1.25rem;
  height: 1.25rem;
  background-color: rgba(18, 56, 79, 1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.toggle-checkbox:checked + .toggle-slider .toggle-circle {
  left: calc(100% - 1.25rem - 0.2rem); /* Move to the right */
  background-color: rgba(16, 197, 225, 1);
}
</style>