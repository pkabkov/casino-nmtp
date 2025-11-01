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
  (e: 'update:modelValue', value: string): void
}>()

const localValue = computed({
  get: () => props.modelValue ?? '',
  set: (val: string) => emit('update:modelValue', val)
})

</script>

<template>
    <label class="label">
        {{ label }}
        <input
            :type="type || 'text'"
            :placeholder="placeholder"
            class="input"
            required
            v-model="localValue"
        />
        <AppErrorMessage v-if="error" :message="error"/>
    </label>
</template>
<style scoped>
.label {
    display: flex;
    flex-direction: column;
    font-size: 1.25rem;
    font-weight: 600;
    color: #444;
    text-align: left;
}
.input {
    margin-top: 0.35rem;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;
}
.input:focus {
    border-color: #42b883;
    box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}
</style>