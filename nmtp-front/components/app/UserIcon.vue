<script lang="ts" setup>

import { computed } from 'vue'
import { useRoute, useRouter  } from 'vue-router'

const props = defineProps<{
  loggedIn: boolean,
  userId?: string
}>()
const router = useRouter() 

function handleClick() {
  if (props.loggedIn) {
    router.push({
      name: 'users-id',
      params: { id: props.userId }
    })
  } else {
    router.push({
      name: 'login',
      query: { redirect: `/users/${props.userId}` }
    })
  }
}

</script>

<template>
  <!-- <Icon name="tabler:user-circle" class="user-icon" /> -->
  <button class="account-btn" @click="handleClick()">
    <svg width="19" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <!-- <Icon name="tabler:user-circle" :class="[isActive ? 'active-but' : 'inactive-but']"
    @click="isActive = !isActive" /> -->

</template>
<!-- <script setup lang="ts">
const isActive = ref(true)
</script> -->

<!-- <template>
  <Icon
    name="tabler:user-circle"
    :class="[isActive ? 'text-green-500' : 'text-gray-400', 'w-8 h-8']"
  />
</template> -->


<style scoped>
.account-btn {
  width: 46px;
  height: 46px;
  border-radius: 100px;
  border: 2px solid var(--cyan);
  background-color: var(--dark-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--cyan);
}
.account-btn:hover {
  background-color: var(--cyan);
  color: var(--charcoal-grey);
}
</style>