<script setup>
import { useRouter  } from 'vue-router'
import { FrontPaths } from '~/utils/constants/frontEndRoutes'

const router = useRouter() 
const route = useRoute()

const { user, session, loggedIn, clear} = useUserSession()

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
onMounted(async () => {
  try {
    let res = await $fetch(`${FrontPaths.BALANCE}/${user.value.id}`,{
      method: "POST"
    })
    let session = useUserSession()
    await session.fetch()
    // console.log(res)
  } catch (error) {
    console.error('Failed to fetch balance:', error)
  }
})
function goToIndex() {
  router.push({ name: 'index' })
}


</script>

<template>
    <nav class="navbar">
        <div class="logo">
            <b @click="goToIndex">N.M.T.P.</b>
        </div>

        <div class="navbar-center">
          <a class="nav-link" @click="goToIndex">
            <img src="@/assets/images/homeIcon.svg" class="home-icon" alt="Home">На главную
          </a>
        </div>

        <div class="navbar-right">
          <div v-if="loggedIn"><span class="balance-text">Баланс: </span><span class="balance-number">{{ user.balance }}</span>
            </div>
            <app-user-icon 
              :loggedIn="loggedIn"
              :userId="user?.id"
            />
            <div>
              <button @click="handleClick()" class="btn-login">
                <img src="@/assets/images/loginButton.svg">
                <span class="btn-login-title">{{ loggedIn ? 'Выйти' : 'Войти' }}</span>
              </button>
            </div>
        </div>
    </nav>
</template>
