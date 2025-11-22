<script setup>
import { useRouter  } from 'vue-router'

const router = useRouter() 
const route = useRoute()

const { user, session, loggedIn, clear, update } = useUserSession()

async function handleClick() {
  if (loggedIn.value) {

    await clear()
    // await session.fetch()

    return navigateTo('/?loggedOut=1')
  } else {
    return navigateTo({ 
      name: 'login',
      query: { 
        redirect: route.fullPath 
      }
    })
  }
}

function goToIndex() {
  router.push({ name: 'index' })
}

const userBalance = computed(() => {
  return user.value.balance ?? 0
})
</script>

<template>
    <nav class="navbar">
        <div class="logo">
            <b>N.M.T.P.</b>
        </div>

        <div class="navbar-center">
          <a class="nav-link" @click="goToIndex">
            <img src="@/assets/images/homeIcon.png" class="home-icon" alt="Home">На главную
          </a>
        </div>

        <div class="navbar-right">
          <div v-if="loggedIn"><span class="balance-text">Баланс: </span><span class="balance-number">{{ userBalance }}</span>
            </div>
            <app-user-icon 
              :loggedIn="loggedIn"
              :userId="user?.id"
            />
            <div>
              <button @click="handleClick()" class="btn-login">
                <img src="@/assets/images/loginButton.png">
                <span class="btn-login-title">{{ loggedIn ? 'Выйти' : 'Войти' }}</span>
              </button>
            </div>
        </div>
    </nav>
</template>
