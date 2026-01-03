import type { TotalStat } from '~/types/totalStat'
import {RoutePaths} from '~/utils/constants/backEndRoutes'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const data = await $fetch<TotalStat>(`${RoutePaths.TOTAL_STAT}/${id}`)

    return data
  } catch (error: any) {
    throw createError(error)
  }
})
