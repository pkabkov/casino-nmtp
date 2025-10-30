<script lang="ts" setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errors = ref<{ username?: string, password?: string, confirm?: string }>({})

function onSubmit() {
    errors.value.username = 'Ошибка: Имя пользователя уже занято!'
    errors.value.password = 'Ошибка: Пароль неверный!'
    errors.value.confirm = 'Ошибка: Пароли не совпадают!'
}
</script>
<template>
    <AppAuthCard>
        <h1 class="title">Регистрация</h1>

        <form @submit.prevent="onSubmit" class="auth-form">
            <AppFormField
                label="Имя пользователя"
                placeholder="Введите имя пользователя"
                :error="errors.username"
            />
            <AppFormField
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                :error="errors.password"
            />
            <AppFormField
                label="Повторите пароль"
                type="password"
                placeholder="Введите пароль"
                :error="errors.confirm"
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
