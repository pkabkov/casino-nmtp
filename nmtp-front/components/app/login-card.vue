<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthErrorMessage } from '~/composables/useAuthErrors'


const username = ref('')
const password = ref('')
const userId = ref('')
const errors = ref<{ username?: string, password?: string }>({})
const response = ref('')
const error = ref('')

function resetForm() {
  username.value = ''
  password.value = ''
  errors.value = {}
  response.value = ''
  error.value = ''
  userId.value = ''
}

async function onSubmit() {
  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: {
        login: username.value.trim(),
        password: password.value.trim()
      }
    })
    response.value = res.message 
    // userId.value = res.id
    // useState('isLoggedIn').value = true
    // navigateTo({
    //   name: 'users-id',
    //   params: {
    //     id: userId.value,
    //   }
    // })
    const session = useUserSession()
    await session.fetch()

    const route = useRoute()
    const redirect = route.query.redirect as string || '/'

    return navigateTo(redirect)

    
  } catch (err: any) {

    error.value = useAuthErrorMessage(err)

    // error.value = err?.data?.message || 'Не удалось отправить форму' 
    
    // if (err?.data?.errors) {
    //   errors.value.username = err.data.errors.username
    //   errors.value.password = err.data.errors.password
    // }
  }
}
function onRemoveError(){
  error.value = ''
}
</script>
<template>
  <div class="page-center">
    <AppAuthCard>
        <h1 class="auth-title">Вход</h1>
        
        <form @submit.prevent="onSubmit" class="form">
            <AppFormField
                label="Логин"
                v-model="username"
                placeholder="Введите логин"
                @remove-error="onRemoveError()"
                
            />
            <!-- <AppErrorMessage message="Ошибка"/> -->
            <AppFormField
                label="Пароль"
                type="password"
                v-model="password"
                placeholder="Введите пароль"
                :error="error"
                @remove-error="onRemoveError()"
            />
            
            <button type="submit" class="button">Войти</button>
            
            <AppAuthLinks type="login" link-path="/signup" />
        </form>
      </AppAuthCard>
    </div>
  </template>