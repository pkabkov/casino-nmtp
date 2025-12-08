<script lang="ts" setup>
import { ref } from 'vue'
import { useSignupErrorMessage } from '~/composables/useSignupErrors'

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errors = ref<{ username?: string, password?: string, passwordConfirm?: string }>({})
const userId = ref('')
const response = ref('')
const error = ref('')

function resetForm() {
  username.value = ''
  password.value = ''
  passwordConfirm.value = ''
  errors.value = {}
  response.value = ''
  error.value = ''
  userId.value = ''
}

async function onSubmit() {
  try {
    const res = await $fetch('/api/signup', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value
      }
    })
    response.value = res.message 
    userId.value = res.id
    useState('isSignedUp').value = true
    navigateTo({
      name: 'users-id',
      params: {
        id: userId.value,
      }
    })
    resetForm()

  } catch (err: any) {
    error.value = useSignupErrorMessage(err)

  }
}
function onRemoveError() {
  error.value = ''
}
</script>
<template>
  <div class="page-center">
    <AppAuthCard>
        <h1 class="auth-title">Регистрация</h1>

        <form @submit.prevent="onSubmit" class="form">
            <AppFormField
                v-model="username"    
                label="Имя пользователя"
                placeholder="Введите имя пользователя"
                required
                @remove-error="onRemoveError()"
                
            />
            <AppFormField
                v-model="password"    
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                @remove-error="onRemoveError()"
            />
            <AppFormField
                v-model="passwordConfirm"
                label="Повторите пароль"
                type="password"
                placeholder="Введите пароль"
                :error="error"
                @remove-error="onRemoveError()"
            />
            <button type="submit" class="form-button">Зарегистрироваться</button>
            <AppAuthLinks type="register" link-path="login/" />
        </form>
    </AppAuthCard>
  </div>
</template>
