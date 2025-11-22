<script lang="ts" setup>
const props = defineProps<{
    type: 'login' | 'register',
    linkPath: string
}>()
</script>
<template>
    <div class="auth-links">
        <template v-if="type === 'register'">
            Есть учётная запись?
            <RouterLink :to="linkPath">Войти</RouterLink>
        </template>
        <template v-else>
            Нет учётной записи?
            <RouterLink :to="linkPath">Зарегистрироваться</RouterLink>
        </template>
    </div>
</template>

