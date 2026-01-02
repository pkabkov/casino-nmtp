<script lang="ts" setup>
import { ref } from 'vue'
import AppEditUserModal from '~/components/app/EditUserModal.vue'
import Rating from '~/pages/rating.vue'
import { useRouter  } from 'vue-router'

const router = useRouter() 
const isStatsExpanded = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)
const errors = ref<{ login?: string; password?: string; newPassword?: string; repeatNewPassword?: string }>({})
const successMessage = ref('')
const { user, session, loggedIn, clear} = useUserSession()

function openEdit() {
  isEditing.value = true
}

function closeEdit() {
  isEditing.value = false
  successMessage.value = ''
  errors.value = {}
}

function toggleStats() {
    isStatsExpanded.value = !isStatsExpanded.value
}

async function logout() {
  if (loggedIn.value) {

    await clear()
    // await session.fetch()
    console.log('Logging out...')
    return navigateTo('/')
    
  }
}

async function deleteAccount() {
    try{
      const res = await $fetch('/api/delete', {
      method: 'POST',
      body: {
        login: user.value?.id
      }
    })
    await clear()
    navigateTo("/")

    }catch(err: any){
      console.log(err)
    }
}

function goToRating() {
  router.push({ name: 'rating' })
}

function goToRocket() {
  router.push({ name: 'rocket' })
}

async function onSubmit(formData: { login: string; password: string; newPassword: string, repeatNewPassword : string }) {
    try {
    isLoading.value = true
    // errorMessage.value = ''
    // successMessage.value = ''

    const res = await $fetch('/api/updatePass', {
      method: 'POST',
      body: {
        username: formData.login,
        password: formData.password,
        newPassword: formData.newPassword,
        newPasswordRepeat: formData.repeatNewPassword
      }
    })
        successMessage.value = res.message || 'Изменения успешно сохранены!'
        alert(successMessage.value)
        closeEdit()
    } catch (err: any) {
    console.log(err.data?.message)    
    const code = err.statusCode
    
    const errorMessage = err.data.data.message

    switch (code) {
      case 400: {
        errors.value.login = errorMessage,
        errors.value.password = errorMessage,
        errors.value.newPassword = errorMessage
        errors.value.repeatNewPassword = errorMessage
        break
      }
      case 402:
        errors.value.password = errorMessage
        break
      case 401:
        errors.value.repeatNewPassword = errorMessage
        break
      case 403:
        errors.value.login = errorMessage,
        errors.value.password = errorMessage
        break
      default:
        errors.value.login = errorMessage,
        errors.value.password = errorMessage,
        errors.value.newPassword = errorMessage,
        errors.value.repeatNewPassword = errorMessage
    }

  } finally {
    isLoading.value = false
  }
  
//   closeEdit()
}

function clearErrors() {
  errors.value = {}
}
</script>

<template>
    <div class="user-summary">
        <div class="icon-container">
            <img src="@/assets/images/userIcon.svg" class="user-icon" />
             <svg 
                class="edit-icon" 
                @click="openEdit"
                width="32" 
                height="32" 
                viewBox="0 0 37 37" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <mask id="path-2-inside-1_503_2125" fill="white">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0H28C32.4183 0 36 3.58172 36 8V28C36 32.4183 32.4183 36 28 36H8C3.58172 36 0 32.4183 0 28V8Z"/>
                </mask>
                <path 
                    d="M0 8C0 3.58172 3.58172 0 8 0H28C32.4183 0 36 3.58172 36 8V28C36 32.4183 32.4183 36 28 36H8C3.58172 36 0 32.4183 0 28V8Z" 
                    fill="var(--icon-bg, currentColor)"
                />
                <path 
                    d="M8 0V2H28V0V-2H8V0ZM36 8H34V28H36H38V8H36ZM28 36V34H8V36V38H28V36ZM0 28H2V8H0H-2V28H0ZM8 36V34C4.68629 34 2 31.3137 2 28H0H-2C-2 33.5228 2.47715 38 8 38V36ZM36 28H34C34 31.3137 31.3137 34 28 34V36V38C33.5228 38 38 33.5228 38 28H36ZM28 0V2C31.3137 2 34 4.68629 34 8H36H38C38 2.47715 33.5228 -2 28 -2V0ZM8 0V-2C2.47715 -2 -2 2.47715 -2 8H0H2C2 4.68629 4.68629 2 8 2V0Z" 
                    fill="var(--icon-border, currentColor)" 
                    mask="url(#path-2-inside-1_503_2125)"
                />
                <path 
                    d="M17.0512 10.8977H13.294C11.7909 10.8977 11.0394 10.8977 10.4653 11.1902C9.96036 11.4475 9.54981 11.858 9.29251 12.363C9 12.9371 9 13.6886 9 15.1916V22.7061C9 24.209 9 24.9606 9.29251 25.5347C9.54981 26.0396 9.96036 26.4502 10.4653 26.7075C11.0394 27 11.7909 27 13.294 27H20.8084C22.3114 27 23.0629 27 23.637 26.7075C24.142 26.4502 24.5525 26.0396 24.8098 25.5347C25.1023 24.9606 25.1023 24.209 25.1023 22.7061V18.9488M14.3674 21.6326H15.8654C16.303 21.6326 16.5219 21.6326 16.7278 21.5831C16.9103 21.5393 17.0848 21.467 17.2449 21.3689C17.4255 21.2583 17.5802 21.1035 17.8897 20.7941L26.4442 12.2395C27.1853 11.4985 27.1853 10.2969 26.4442 9.55581C25.7031 8.81473 24.5015 8.81472 23.7605 9.55581L15.2059 18.1104C14.8964 18.4198 14.7417 18.5746 14.6311 18.7551C14.533 18.9152 14.4607 19.0897 14.4169 19.2722C14.3674 19.4782 14.3674 19.697 14.3674 20.1346V21.6326Z" 
                    stroke="var(--icon-stroke, currentColor)" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                />
            </svg>
        </div>
        
        <label class="full-width-label">
          Логин
        </label>
        <div>
            <span class="text-gray">Баланс : </span>
            <span class="number">1000</span>
        </div>
        <div>
            <span class="text-gray">Место в общем <a @click="goToRating" class="text-gray-link">рейтинге</a> : </span>
            <span class="number">9999990</span>
        </div>
        
        <div class="stats-section">
            <div class="stats-header">
                <span @click="toggleStats" class="text-gray-link">Моя статистика</span>
                <button @click="toggleStats" class="expand-btn">
                    <Icon 
                        :name="isStatsExpanded ? 'tabler:chevron-up' : 'tabler:chevron-down'" 
                        class="expand-icon"
                    />
                </button>
            </div>
            
            <div v-if="isStatsExpanded" class="stats-list">
                <div>Траты: 1250</div>
                <div>Выигрыш: 1250</div>
                <div>Всего игр: 1250</div>
                <div>Любимая игра: <a @click="goToRocket" class="game-link">Ракета</a></div>
            </div>
        </div>
        
        <NuxtLink @click.prevent="logout" class="logout-link">
            Выйти
        </NuxtLink>
        
        <NuxtLink @click.prevent="deleteAccount" class="delete-link">
            Удалить учётную запись
        </NuxtLink>
         <AppEditUserModal 
            :show="isEditing"
            :errors="errors"
            @close="closeEdit"
            @submit="onSubmit"
            @clear-errors="clearErrors"/>
    </div>
</template>