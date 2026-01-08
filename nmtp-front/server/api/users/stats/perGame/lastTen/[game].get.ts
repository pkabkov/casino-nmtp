import type { LastGames } from '~/types/lastGames'
import {RoutePaths} from '~/utils/constants/backEndRoutes'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await getUserSession(event)
    
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    const userId = user.id 
    const gameName = getRouterParam(event, 'game')
    // const userId = getRouterParam(event, 'id')
    const games = await $fetch<LastGames>(`${RoutePaths.LAST_GAMES}/${userId}/${gameName}`)
    return games
  } catch (error: any) {
    throw createError(error)
  }
})
