<script lang="ts" setup>
const props = defineProps<{
  signupPath: string
}>()
function onSubmit(){

}

</script>
<template>
  <div class="auth-card">
    <h1 class="title">Вход</h1>

    <form @submit.prevent="onSubmit" class="auth-form">
      <label class="label">
        Логин
        <input type="text" name="login-field" class="input" required />
      </label>

      <label class="label">
        Пароль
        <input type="password" name="pass-field" class="input" required />
      </label>

      <div class="button-container">
        <button type="submit" class="submit-btn">Войти</button>
      </div>

      <div class="register-link">
        Нет учётной записи? <RouterLink :to="signupPath">Зарегистрироваться</RouterLink>
      </div>
    </form>
  </div>
</template>
<style scoped>


.auth-card {
  max-width: 380px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #e0e0e0; 
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}


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


.label {
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
  text-align: left;
}

.input {
  margin-top: 0.35rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}


.button-container {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-start;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
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


.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.register-link a {
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>