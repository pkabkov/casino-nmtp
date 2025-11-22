// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', 'nuxt-auth-utils'],
  
  runtimeConfig: {
    session: {
      name:'casino',
      cookie:{
        maxAge: 60 * 1,
      },
      password: ''
    }
  },
  css: [
    '@/assets/css/main.css',    
       
  ],
})