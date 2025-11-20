export default defineNuxtRouteMiddleware(async (to) => {
  if (to.query.loggedOut === '1') return
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

  if (publicRoutes.includes(to.path)) return

  // PROTECTED pages only
  if (!session.loggedIn.value) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})
