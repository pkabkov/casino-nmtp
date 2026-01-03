import { ProfileResponse } from "~/types/profileResponse"
import {RoutePaths} from "~/utils/constants/backEndRoutes"
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    await $fetch(RoutePaths.REGISTER_GAME,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }
    )
    
    const session = await getUserSession(event)
    const profileUrl = `${RoutePaths.PROFILE}/${session.user?.id}`

    let res = await $fetch<ProfileResponse>(profileUrl, {
        method: 'POST'
    })
    await setUserSession(event, {
        ...session,
        user: {
        ...session.user,
        balance: res.balance
        }
    })    
  } catch (err) {
    console.error('API ERROR:', err)
    throw err
  }
})
