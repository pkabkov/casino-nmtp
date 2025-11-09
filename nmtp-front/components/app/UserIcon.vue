<script lang="ts" setup>

import { computed } from 'vue'
import { useRoute, useRouter  } from 'vue-router'


const router = useRouter() 

function goToLogin() {
  router.push({ name: 'login' })
}

</script>

<template>
  <!-- <Icon name="tabler:user-circle" class="user-icon" /> -->
  <button class="account-btn" @click="goToLogin">
    <img src="@/assets/images/userIcon.png">
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
  border: 2px solid #10C5E1;
  background-color: #12384F;
  padding-left: 3px;
  padding-right: 3px;
  cursor: pointer;
}
.account-btn:active {
    transform: translateY(1px);
}
</style>