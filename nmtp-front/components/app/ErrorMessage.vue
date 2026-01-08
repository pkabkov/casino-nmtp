<script lang="ts" setup>
const props = defineProps<{ message: string }>()
</script>
<template>
    <span class="form-error">{{ message }}</span>
</template>
