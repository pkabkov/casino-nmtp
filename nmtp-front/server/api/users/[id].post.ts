import { defineEventHandler, readBody, createError } from 'h3'
import {RoutePaths} from '~/utils/constants/backEndRoutes'
import {ProfileResponse} from '~/types/profileResponse'


//Для получения баланса 
export default defineEventHandler(async (event) => {
  const id = event.context?.params?.id as string | undefined
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing user id in route' })
  }

  const profileUrl = `${RoutePaths.PROFILE}/${event.context.params?.id}`

  let res: ProfileResponse
  try { 
    const session = await getUserSession(event)

    res = await $fetch<ProfileResponse>(profileUrl, {
        method: 'POST'
    })
    await setUserSession(event, {
        ...session,
        user: {
        ...session.user,
        balance: res.balance
        }
    })

  } catch (err: any) {
    console.log(err)
    throw createError({
      statusCode: 502,
      statusMessage: `Failed fetching profile: ${err?.message ?? err}`
    })
  }
  return {
    // login: res.login,
    balance: res.balance,
    // profile: res
  }
})
