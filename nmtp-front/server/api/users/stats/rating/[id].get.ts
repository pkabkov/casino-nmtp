import type { PositionResponse } from '~/types/positionResponse'
import {RoutePaths} from '~/utils/constants/backEndRoutes'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const data = await $fetch<PositionResponse>(`${RoutePaths.RATING_POS}/${id}`)

    return data
  } catch (error: any) {
    throw createError(error)
  }
})
