<script lang="ts" setup>
    const isActive = ref(true)
</script>

<template>
  <!-- <Icon name="tabler:user-circle" class="user-icon" /> -->
  <Icon name="tabler:user-circle" :class="[isActive ? 'active-but' : 'inactive-but']"
    @click="isActive = !isActive"/>

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
.active-but {
  width: 40px;
  height: 40px;
  color: #2563eb; 
  transition: 0.3s ease;
  margin-left: 10px;
}

.inactive-but {
  width: 40px;
  height: 40px;
  color: #9ca3af; 
  opacity: 0.6;
  transition: 0.3s ease;
  margin-left: 10px;
}
</style>