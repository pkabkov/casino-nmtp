<script setup lang="ts">
import type { UserRatingResponse } from '~/types/userRatingResponse'

// definePageMeta({
//   middleware: ['auth'],
// })

const { data: usersResponse, error, status} = await useFetch<UserRatingResponse>(`/api/rating/`, {
  lazy: true,
})


const userList = computed(() => usersResponse.value?.users || [])
const currentUser = computed(() => usersResponse.value?.current)
</script>

<template>
  <div class="vertical-container-center">
    <div class="title-container">
      <Icon name="tabler:trophy" class="trophy-icon"/>
      <h2 class="rating-title">Рейтинг игроков</h2>
    </div>
    <div class="rating-container">
      <div v-if="status !== 'success'" class="loading">
        Загрузка...
        <span><Icon name="tabler:loader-3" class="spin" /></span>
      </div>

      <table v-else class="rating-table">
        <thead>
          <tr>
            <th>Место</th>
            <th>Пользователь</th>
            <th>Рейтинг</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(user, index) in userList.slice(0, 10)"
            :key="index"
            :class="{ 'current-user': currentUser && user.place === currentUser.place }"
          >
            <td>{{ user.place }}</td>
            <td>
              {{ user.username }}
              <span v-if="currentUser && user.place === currentUser.place"> (Вы)</span>
            </td>
            <td>{{ user.rating }}</td>
          </tr>

          <tr class="separator-row" :class="{ hidden: !currentUser }">
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>

          <!-- Show the current user's row if not in top 10 -->
          <tr
            v-if="currentUser && !userList.slice(0, 10).some(u => u.place === currentUser.place)"
            :class="'current-user'"
          >
            <td>{{ currentUser.place }}</td>
            <td>{{ currentUser.username }} (вы)</td>
            <td>{{ currentUser.rating }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
