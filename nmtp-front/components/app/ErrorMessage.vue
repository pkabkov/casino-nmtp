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
    margin-bottom: 2px;
    margin-top: 10px;
    /* margin-left: 12px; */
}
</style>