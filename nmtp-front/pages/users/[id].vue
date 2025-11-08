<script lang="ts" setup>
import type { User } from '~/types/user';

    const route = useRoute();
    const { data: user, error, status } = await useFetch<User>(`/api/users/${route.params.id}`, {
	  lazy: true,
    });
</script>

<template>
  <!-- <h2>Окно пользователя</h2> -->
  <!-- <h3 v-for="game in user?.games" :key="game.name">{{ game.name }}</h3> -->
  <div class="profile-container">
        <AppUserSummary />
        <AppUserHistory />
        
  </div>

</template>

<style scoped>
.profile-container {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    border: 1px solid #14cb48;
}
</style>