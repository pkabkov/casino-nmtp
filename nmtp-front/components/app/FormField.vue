<script lang="ts" setup>
import {computed} from 'vue'
const props = defineProps<{
    label: string,
    type?: string,
    placeholder?: string,
    error?: string,
    modelValue?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
    (e: 'removeError'): void

}>()

const localValue = computed({
  get: () => props.modelValue ?? '',
  set: (val: string) => {emit('update:modelValue', val)
    }
})

</script>

<template>
    <label class="form-group">
        <span class="form-label">{{ label }}</span>
        <input
            :type="type || 'text'"
            :placeholder="placeholder"
            class="form-input"
            v-model="localValue"
            @input="emit('removeError')"
        />
        <AppErrorMessage v-if="error" :message="error"/>
    </label>
</template>
