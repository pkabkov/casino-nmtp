export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password, passwordConfirm } = body

  if (!passwordConfirm || !password || !login) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing username or password or passwordConfirm'
    })
  }

  try{
    const bodyToSend: Record<string, string> = {}

    if (login !== '') bodyToSend.login = login
    if (password !== '') bodyToSend.password = password

    const res = await $fetch<{ login: string }>(
      'http://localhost:8080/api/register',
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

    // console.log(balanceInfo.balance ?? "Пусто")

    await setUserSession(event, {
      user: { id: res.login, balance: balanceInfo.balance },
      secure: { apiToken: '1234567890' }
    })

  } catch (err: any) {

    const status = err?.status || err?.statusCode || err?.response?.status
    const serverMessage =
      err?.data?.message || err?.response?.data?.message || err?.message || err?.statusMessage

    throw createError({ statusCode: status, statusMessage: serverMessage })
  }

  if (password !== passwordConfirm) {
    throw createError({
      statusCode: 444,
      statusMessage: 'Passwords don`t match'
    })
  }
  
})