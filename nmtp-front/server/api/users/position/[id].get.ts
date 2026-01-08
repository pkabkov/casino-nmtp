import { RoutePaths } from "~/utils/constants/backEndRoutes"
import type {PositionResponse} from "~/types/positionResponse"

export default defineEventHandler(async (event) => {
    const idParam = getRouterParam(event, 'id')
    try {
        const resp = await $fetch<PositionResponse>(`${RoutePaths.LEADER_BOARD}/${idParam}`)
        return resp
    } catch (error: any) {
        throw createError(error)
    }
})