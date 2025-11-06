<script lang="ts" setup>
import { ref } from 'vue'
import AppEditUserModal from '~/components/app/EditUserModal.vue'

const isStatsExpanded = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)
const errors = ref<{ login?: string; password?: string; newPassword?: string; repeatNewPassword?: string }>({})
const successMessage = ref('')

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

function logout() {
    console.log('Logging out...')
}

function deleteAccount() {
    console.log('Deleting account...')
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
            <Icon name="tabler:user-circle" class="user-icon" />
            <Icon name="tabler:edit" class="edit-icon" @click="openEdit" />
        </div>
        
        <label class="full-width-label">
            Профиль пользователя
        </label>
        <div class="rating-label">
            Баланс : 1000
        </div>
        <div class="rating-label">
            Место в общем рейтинге
        </div>
        
        <div class="stats-section">
            <div class="stats-header">
                <span>Моя статистика</span>
                <button @click="toggleStats" class="expand-btn">
                    <Icon 
                        :name="isStatsExpanded ? 'tabler:chevron-up' : 'tabler:chevron-down'" 
                        class="expand-icon"
                    />
                </button>
            </div>
            
            <div v-if="isStatsExpanded" class="stats-list">
                <div class="stat-item">Траты: 1250</div>
                <div class="stat-item">Выигрыш: 1250</div>
                <div class="stat-item">Всего игр: 1250</div>
                <div class="stat-item">Любимая игра: 1250</div>

            </div>
        </div>
        
        <a href="#" @click.prevent="logout" class="logout-link">
            Выйти
        </a>
        
        <a href="#" @click.prevent="deleteAccount" class="delete-link">
            Удалить учётную запись
        </a>
         <AppEditUserModal 
            :show="isEditing"
            :errors="errors"
            @close="closeEdit"
            @submit="onSubmit"
            @clear-errors="clearErrors"/>
    </div>
</template>

<style scoped>
.icon-container {
  display: flex;
  justify-content: space-between;
  align-items:baseline;
  width: 100%;
  margin-bottom: -0.5rem;
}

.user-icon {
    margin: 0 auto; 
    width: 100px;
    height: 100px;
    color: #42b883;
    cursor: pointer;
}
.edit-icon {
    width: 30px;
    height: 30px;
    color: red;
    cursor: pointer;
}
.stats-section {
    display: block; 
    width: 100%;
    box-sizing: border-box; 
    /* border: 1px solid #e0e0e0; */
    /* border-radius: 8px; */
    /* padding: 0.75rem; */
}

.stats-header {
    display: flex;
    justify-content:flex-start;
    align-items: center;
    font-weight: 500;
    color: #333;
}
.user-summary {
    flex: 0 0 33.333%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.full-width-label {
    display: block; 
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: #42b883;
    border: none;
    border-radius: 8px;
    text-align: center;
}


.rating-label {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
}

.expand-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    color: #666;
}

.expand-icon {
    width: 20px;
    height: 20px;
}

.stats-list {
    margin-top: 0.75rem;
    padding-left: 0;
    list-style: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0.75rem;
}

.stat-item {
    padding: 0.5rem 0;
    color: #555;
    font-size: 0.95rem;
}

.logout-link {
    color: #42b883;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
}

.logout-link:hover {
    text-decoration: underline;
}

.delete-link {
    color: #dc2626;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
}

.delete-link:hover {
    text-decoration: underline;
}
</style>