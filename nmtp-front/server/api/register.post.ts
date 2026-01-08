import { RoutePaths } from "~/utils/constants/backEndRoutes"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password, passwordConfirm } = body

  try{
    const bodyToSend: Record<string, string> = {}

    if (login !== '') bodyToSend.login = login
    if (password !== '') bodyToSend.password = password

    const res = await $fetch<{ login: string }>(
      RoutePaths.REGISTER,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyToSend
      }
    )
    let balanceInfo = await $fetch(
      `/api/users/${res.login}`,
      {
        method: 'POST'
      }
    )

    await setUserSession(event, {
      user: { id: res.login, balance: balanceInfo.balance },
      // secure: { apiToken: '1234567890' }
    })

  } catch (err: any) {

    const status = err?.status || err?.statusCode || err?.response?.status
    const serverMessage =
      err?.data?.message || err?.response?.data?.message || err?.message || err?.statusMessage

    throw createError({ statusCode: status, statusMessage: serverMessage })
  }
  
})