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
<style scoped>
.auth-links {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
    text-align: center;
}
.auth-links a {
    color: #42b883;
    text-decoration: none;
    font-weight: 500;
}
.auth-links a:hover {
    text-decoration: underline;
}
</style>
