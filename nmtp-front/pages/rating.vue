<script setup lang="ts">
import type { UserRatingResponse } from '~/types/userRatingResponse'
import { FrontPaths } from '~/utils/constants/frontEndRoutes';

// definePageMeta({
//   middleware: ['auth'],
// })

const { data: usersResponse, error, status} = await useFetch<UserRatingResponse>(FrontPaths.LEADER_BOARD, {
  lazy: true,
})
// const usersResponse = $fetch <UserRatingResponse>(FrontPaths.LEADER_BOARD)

const userList = computed(() => usersResponse.value?.users)
// console.log(userList)
const currentUser = computed(() => usersResponse.value?.current)
// console.log(currentUser)
</script>

<template>
  <div class="vertical-container-center">
    <div class="title-container">
      <img src="@/assets/images/trophy.svg" class="trophy-icon"/>
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
            v-for="(user, position) in userList"
            :key="position"
            :class="{ 'current-user': currentUser && user.position === currentUser.position }"
          >
            <td>{{ user.position }}</td>
            <td>
              {{ user.login }}
              <span v-if="currentUser && user.position === currentUser.position"> (Вы)</span>
            </td>
            <td>{{ user.balance }}</td>
          </tr>

          <tr class="separator-row" :class="{ hidden: !currentUser }">
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>

          <!-- Show the current user's row if not in top 10 -->
          <tr
            v-if="currentUser && !userList?.some(u => u.position === currentUser.position)"
            :class="'current-user'"
          >
            <td>{{ currentUser.position }}</td>
            <td>{{ currentUser.login }} (вы)</td>
            <td>{{ currentUser.balance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>