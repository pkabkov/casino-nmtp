<script lang="ts" setup>
import type { User } from '~/types/user';

    const route = useRoute();
    const { data: user, error, status } = await useFetch<User>(`/api/users/${route.params.id}`, {
	lazy: true,
});
</script>

<template>
  <h2>Окно пользователя</h2>
  <h3 v-for="game in user?.games" :key="game.name">{{ game.name }}</h3>

</template>

<style scoped>

</style>