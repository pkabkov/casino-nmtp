<script lang="ts" setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const errors = ref<{ username?: string, password?: string }>({})
const response = ref('')
const error = ref('')

async function onSubmit() {

  response.value = ''
  error.value = ''
  errors.value = {}

  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })
    response.value = res.message 
    
  } catch (err: any) {
    error.value = err?.data?.message || 'Не удалось отправить форму' 
    
    if (err?.data?.errors) {
      errors.value.username = err.data.errors.username
      errors.value.password = err.data.errors.password
    }
  }
}
function updateName(newName : string){
  username.value = newName
}
function updatePass(newName : string){
  password.value = newName
}
</script>
<template>
    <AppAuthCard>
        <h1 class="title">Вход</h1>

        <form @submit.prevent="onSubmit" class="auth-form">
            <AppFormField
                label="Имя пользователя"
                v-model="username"
                placeholder="Введите имя пользователя"
                :error="errors.username"
                @update-field="updateName"
            />
            <AppFormField
                label="Пароль"
                type="password"
                v-model="password"
                placeholder="Введите пароль"
                :error="errors.password"
                @update-field="updatePass"
            />
            <div class="button-container">
                <button type="submit" class="submit-btn">Войти</button>
            </div>
            <AppAuthLinks type="login" link-path="signup" />
        </form>
    </AppAuthCard>
</template>
<style scoped>
.title {
    margin: 0 0 1.5rem;
    font-size: 1.75rem;
    font-weight: 600;
    color: #333;
    text-align: center;
}
.auth-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.button-container {
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-start;
}
.submit-btn {
    padding: 0.75rem 1.5rem;
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: #42b883;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}
.submit-btn:hover {
    background-color: #369e6e;
}
.submit-btn:active {
    transform: translateY(1px);
}
</style>
