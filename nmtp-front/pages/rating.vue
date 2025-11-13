<script setup lang="ts">
import type { UserRatingResponse } from '~/types/userRatingResponse'

const { data: usersResponse, error, status } = await useFetch<UserRatingResponse>(`/api/rating/`, {
  lazy: true,
})

const userList = usersResponse.value?.users || []
const currentUser = usersResponse.value?.current
</script>

<template>
  <div class="rating-container">
    <div class="title-container">
      <Icon name="tabler:trophy" class="trophy-icon" />
      <h2 class="rating-title">Рейтинг Игроков</h2>
    </div>

    <div v-if="status === 'pending'" class="loading">
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
            <span v-if="currentUser && user.place === currentUser.place"> (вы)</span>
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
</template>

<style scoped>
.rating-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  width: 90%;
  max-width: 800px;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.trophy-icon {
  width: 40px;
  height: 40px;
  color: rgb(239, 48, 48);
}

.rating-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
}

.rating-table {
  width: 100%;
  border-collapse: collapse;
}

.rating-table th {
  background: #42b883;
  color: white;
  text-align: center;
  padding: 0.75rem;
}

.rating-table td {
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.current-user {
  background: #fff9e6;
  font-weight: bold;
  border-left: 4px solid #f2b600;
  transition: background 0.3s ease;
}

.separator-row td {
  text-align: center;
  color: #999;
  font-weight: bold;
}

.loading {
  color: #555;
  font-size: 1rem;
  font-weight: 500;
}

.hidden {
  display: none;
}

.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
