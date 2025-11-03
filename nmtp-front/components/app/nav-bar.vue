<script setup>
import { computed } from 'vue'
import { useRoute, useRouter  } from 'vue-router'

const route = useRoute()
const router = useRouter() 

const isLoginPage = computed(() => route.name === "login")
const isIndexPage = computed(() => route.name === "index")
const isSignupPage = computed(() => route.name === "signup")

function goToLogin() {
  router.push({ name: 'login' })
}
</script>

<template>
    <nav class="navbar">
        <div class="logo">
            <b>N.M.T.P.</b>
        </div>
        <div class="navbar-center">
            <template v-if="isLoginPage || isSignupPage">
                <a href="/" class="nav-link">На главную</a>
            </template>
        </div>
        <div class="navbar-right" v-if="isIndexPage">
            <app-user-icon />
            <button @click="goToLogin" class="btn-login">Войти</button>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
}

.logo, .navbar-center, .navbar-right {
  display: flex;
  align-items: center;
}

.navbar-center {
  flex: 1;
  justify-content: center;
  margin-left: -165px;
}

.logo {
  flex: 0 0 auto;
}

.navbar-right {
  flex: 0 0 auto;
  gap: 1rem;
}

b {
  font-size: 2.6rem;
}

.nav-link {
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  padding: 0.25rem 1.5rem;
  border-radius: 8px;
}

.btn-login {
    padding: 0.75rem 1.5rem;
    width: 70%;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: #42b883;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}
.btn-login:hover {
    background-color: #369e6e;
}
.btn-login:active {
    transform: translateY(1px);
}
</style>
