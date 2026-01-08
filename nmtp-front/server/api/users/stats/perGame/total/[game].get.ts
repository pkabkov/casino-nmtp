import type { TotalStat } from '~/types/totalStat'
import {RoutePaths} from '~/utils/constants/backEndRoutes'

export default defineEventHandler(async (event) => {
  try {
    const game = getRouterParam(event, 'game')
    const { user } = await getUserSession(event)
    
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    const userId = user.id 
    const data = await $fetch<TotalStat>(`${RoutePaths.TOTAL_PER_GAME}/${userId}/${game}`)

    return data
  } catch (error: any) {
    throw createError(error)
  }
})
