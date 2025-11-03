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
    <AppAuthCard>
        <h1 class="title">Регистрация</h1>

        <form @submit.prevent="onSubmit" class="auth-form">
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
            <div class="button-container">
                <button type="submit" class="submit-btn">Зарегистрироваться</button>
            </div>
            <AppAuthLinks type="register" link-path="login" />
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
