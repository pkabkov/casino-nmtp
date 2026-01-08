<script lang="ts" setup>
import { ref } from 'vue'
import { FrontPaths } from '~/utils/constants/frontEndRoutes'

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorLogin = ref('')
const errorPassword = ref('')
const errorPasswordConfirm = ref('')

async function verif() {
  if (username.value == "") errorLogin.value = "Пожалуйста, заполните все поля!"
  if (password.value != "" && passwordConfirm.value != "" && passwordConfirm.value != password.value) {
    errorPassword.value = "Пароли не совпадают!"
    errorPasswordConfirm.value = "Пароли не совпадают!"
  }
  if (password.value == "") errorPassword.value = "Пожалуйста, заполните все поля!"
  if (passwordConfirm.value == "") errorPasswordConfirm.value = "Пожалуйста, заполните все поля!"
  if (errorLogin.value == "" && errorPassword.value == "" && errorPasswordConfirm.value == "")
    onSubmit()
}

async function onSubmit() {
  
  try {
    const res = await $fetch(FrontPaths.REGISTER, {
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
    const status = err?.status ?? err?.statusCode
    if (status == 409) errorLogin.value = "Логин уже занят!"

    if (status == 500) errorPasswordConfirm.value = "Ошибка сервера. Попробуйте позже."
    
  }
}
function onRemoveError() {
  errorLogin.value = ''
  errorPassword.value = ''
  errorPasswordConfirm.value = ''
}
</script>
<template>
  <div class="page-center">
    <AppAuthCard>
        <h1 class="auth-title">Регистрация</h1>

        <form @submit.prevent="verif" class="form">
            <AppFormField
                v-model="username"    
                label="Имя пользователя"
                placeholder="Введите имя пользователя"
                required
                :error="errorLogin"
                @remove-error="onRemoveError()"
                
            />
            <AppFormField
                v-model="password"    
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                :error="errorPassword"
                @remove-error="onRemoveError()"
            />
            <AppFormField
                v-model="passwordConfirm"
                label="Повторите пароль"
                type="password"
                placeholder="Введите пароль"
                :error="errorPasswordConfirm"
                @remove-error="onRemoveError()"
            />
            <button type="submit" class="button">Зарегистрироваться</button>
            <AppAuthLinks type="register" link-path="login/" />
        </form>
    </AppAuthCard>
  </div>
</template>
