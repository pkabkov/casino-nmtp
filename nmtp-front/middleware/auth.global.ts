import { FrontPaths } from "~/utils/constants/frontEndRoutes"

export default defineNuxtRouteMiddleware(async (to) => {
  // if (to.query.loggedOut === '1') return navigateTo("/")
  const session = useUserSession()

  await session.fetch()

  const publicRoutes = [
    '/',    
    '/index',        
    '/login',
    '/signup',
    '/rocket',
    '/spinWheel',
    '/mineSweeper'
  ]
  if (to.query.loggedOut === '1' && !publicRoutes.includes(to.path)) return navigateTo("/")
  if (to.query.loggedOut === '1' && publicRoutes.includes(to.path)) {
    return navigateTo(
      { path: to.path },
      { replace: true }
    )
  }
  if (to.path === '/profile' && session.loggedIn.value) {
    return navigateTo(`/users/${session.user.value.id}`)
  }
  
  if (publicRoutes.includes(to.path)){ 
    if (to.path === '/login' && session.loggedIn.value) {
      return navigateTo('/')
    }
    return
  }

  if (!session.loggedIn.value) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.path }
    })
  }
})
