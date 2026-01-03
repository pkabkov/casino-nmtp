<script lang="ts" setup>
  
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
    flex: 1;
    display: flex;
    justify-content: center;
    background: var(--charcoal-grey);
    gap: 2rem;
    padding: 1.5rem 0rem;
    margin: 0 auto;
}
</style>