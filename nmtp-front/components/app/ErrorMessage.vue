<script lang="ts" setup>
const props = defineProps<{ message: string }>()
</script>
<template>
    <span class="error-message">{{ message }}</span>
</template>
<style scoped>
.error-message {
    color: red;
    font-size: 0.85rem;
    margin-top: 2px;
}
</style>