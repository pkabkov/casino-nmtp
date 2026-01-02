<script lang="ts" setup>
import { ref } from 'vue'
import { useSignupErrorMessage } from '~/composables/useSignupErrors'

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const error = ref('')

async function onSubmit() {
  try {
    const res = await $fetch('/api/register', {
      method: 'POST',
      body: {
        login: username.value.trim(),
        password: password.value.trim(),
        passwordConfirm: passwordConfirm.value.trim(),
      }
    })

    const session = useUserSession()
    await session.fetch()

    const route = useRoute()
    const redirect = route.query.redirect as string || '/'

    return navigateTo(redirect)

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
            <button type="submit" class="button">Зарегистрироваться</button>
            <AppAuthLinks type="register" link-path="login/" />
        </form>
    </AppAuthCard>
  </div>
</template>
