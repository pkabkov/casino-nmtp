<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ 
  show: boolean,
  errors: {
    login?: string
    password?: string
    newPassword?: string
    repeatNewPassword?: string
  }
}>()
const emit = defineEmits(['close', 'submit', 'clear-errors'])

const login = ref('')
const password = ref('')
const newPassword = ref('')
const repeatNewPassword = ref('')

function closeModal() {
  emit('close')
}

function submitForm() {
  emit('submit', 
  { login: login.value, 
    password: password.value, 
    newPassword: newPassword.value, 
    repeatNewPassword: repeatNewPassword.value 
  })
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
        <Icon name="tabler:x" class="close-icon" @click="closeModal" />
      </div>

      
      <form @submit.prevent="submitForm" class="form">
        <AppFormField 
          label="Логин" 
          v-model="login" 
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
        <button type="submit" class="submit-btn">Изменить</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}


.modal {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  gap: 1.25rem;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-icon {
  width: 26px;
  height: 26px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
}

.close-icon:hover {
  color: #cd0606;
}

/* Form body */
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Submit button */
.submit-btn {
  align-self: stretch;
  padding: 0.75rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background: #369e6e;
}

.submit-btn:active {
  transform: translateY(1px);
}
</style>
