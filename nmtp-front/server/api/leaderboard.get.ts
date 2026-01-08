import { RoutePaths } from "~/utils/constants/backEndRoutes"
import type {LeaderboardResponse, LeaderboardEntry} from "~/types/leaderboard"
import { FrontPaths } from "~/utils/constants/frontEndRoutes"
import { PositionResponse } from "~/types/positionResponse"
export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  // await new Promise(resolve => setTimeout(resolve, 2000));
  const data = await $fetch<LeaderboardResponse>(RoutePaths.LEADER_BOARD)
  // console.log(data.leaderboard)

  const currentPlace = await $fetch<PositionResponse>(`${FrontPaths.POSITION}/${session.user?.id}`)
  const rating = await $fetch<{balance: number}>(`${FrontPaths.BALANCE}/${session.user?.id}`, {
    method: "POST"
  })
  // console.log(rating)
  // console.log(currentPlace.position, " current place")
  // console.log(session.user?.id, " id")
  const response = {
    users: data.leaderboard,
    // current: { place: 20, username: 'cref', rating: 1000 }
    // current: null
    current: { position: currentPlace.position, login: session.user?.id, balance: rating.balance }
  }

  return response
})