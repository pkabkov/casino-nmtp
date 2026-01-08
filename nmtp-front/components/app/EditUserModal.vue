<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ 
  show: boolean,
  errors: {
    login?: string
    password?: string
    newPassword?: string
    repeatNewPassword?: string
  },
  successResp: boolean,
}>()
const emit = defineEmits(['close', 'submit', 'clear-errors'])

const newLogin = ref('')
const password = ref('')
const newPassword = ref('')
const repeatNewPassword = ref('')
function clearFileds(){
  newLogin.value = ''
  password.value = ''
  newPassword.value = ''
  repeatNewPassword.value = ''
}
function closeModal() {
  emit('close')
  clearFileds()
  // newLogin.value = ''
  // password.value = ''
  // newPassword.value = ''
  // repeatNewPassword.value = ''
}
watch(() => props.successResp, (newValue) => {
  // console.log(props.successResp)
  if (newValue) {
    clearFileds()
  }
}, { immediate: true })

function submitForm() {
  emit('submit', 
  { newLogin: newLogin.value, 
    password: password.value, 
    newPassword: newPassword.value, 
    repeatNewPassword: repeatNewPassword.value 
  })
  // newLogin.value = ''
  // password.value = ''
  // newPassword.value = ''
  // repeatNewPassword.value = ''
}
function onInput() {
  emit('clear-errors')
}
</script>

<template>
  <div v-if="show" class="overlay" @keydown.esc="closeModal" tabindex="0">
    <div class="modal">

      <div class="header-row">
        <h2 class="title">Изменить данные</h2>
        <Icon name="tabler:square-x" class="close-icon" @click="closeModal" />
      </div>

      
      <form @submit.prevent="submitForm" class="form">
        <AppFormField 
          label="Новый логин" 
          v-model="newLogin" 
          placeholder="Username 123"
          :error="errors.login"
          @remove-error="onInput"
        />
        <AppFormField 
          label="Старый пароль" 
          type="password" 
          v-model="password" 
          placeholder="Введите пароль"
          :error="errors.password"
          @remove-error="onInput"
        />
        <AppFormField 
          label="Новый пароль" 
          type="password" 
          v-model="newPassword" 
          placeholder="Введите пароль"
          :error="errors.newPassword"
          @remove-error="onInput"
        />
        <AppFormField 
          label="Повторите новый пароль" 
          type="password" 
          v-model="repeatNewPassword" 
          placeholder="Введите пароль"
          :error="errors.repeatNewPassword"
          @remove-error="onInput"
        />
        <button type="submit" class="button">Сохранить изменения</button>
      </form>
    </div>
  </div>
</template>
