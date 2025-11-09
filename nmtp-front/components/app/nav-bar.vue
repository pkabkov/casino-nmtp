<script setup>
import { useRouter  } from 'vue-router'

const router = useRouter() 

function goToLogin() {
  router.push({ name: 'login' })
}

function goToIndex() {
  router.push({ name: 'index' })
}

</script>

<template>
    <nav class="navbar">
        <div class="logo">
            <b>N.M.T.P.</b>
        </div>
        <div class="navbar-center">
          <a class="nav-link" @click="goToIndex">
            <img src="@/assets/images/homeIcon.png" class="home-icon">На главную
          </a>
        </div>
        <div class="navbar-right">
            <app-user-icon />
            <button @click="goToLogin" class="btn-login">
              <img src="@/assets/images/loginButton.png">
              <span class="btn-login-title">Войти</span>
            </button>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 122px;
  border-bottom: 1px solid #12384F;
}

.logo, .navbar-center, .navbar-right {
  display: flex;
  align-items: center;
}

.navbar-center {
  flex: 1;
  justify-content: center;
}

.logo {
  flex: 0 0 auto;
  margin-left: 30px;
}

.navbar-right {
  flex: 0 0 auto;
  gap: 1rem;
  margin-right: 30px;
}

b {
  font-size: 48px;
}

.nav-link {
  font-size: 28px;
  font-weight: 700;
  color: #10C5E1;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.home-icon {
  padding-right: 16px;
}
.btn-login {
    padding: 0.75rem 1rem;
    width: 120px;
    height: 46px;
    font-size: 16px;
    font-weight: 600;
    color: #1C1C1F;
    background-color: #10C5E1;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    flex-direction: row;
    align-items: center; 
}
.btn-login-title {
  padding-left: 16px;
}
.btn-login:active {
    transform: translateY(1px);
}
</style>
