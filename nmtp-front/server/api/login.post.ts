export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password } = body

  try {
    const bodyToSend: Record<string, string> = {}

    if (login !== '') bodyToSend.login = login
    if (password !== '') bodyToSend.password = password

    const res = await $fetch<{ login: string }>(
      'http://localhost:8080/api/auth',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyToSend
      }
    )

    await setUserSession(event, {
      user: { id: res.login, balance: 12 },
      secure: { apiToken: '1234567890' }
    })

    return { message: 'Login successful!', user: res.login, id: '1' }

    
  } catch (err: any) {

    const status = err?.status || err?.statusCode || err?.response?.status
    const serverMessage =
      err?.data?.message || err?.response?.data?.message || err?.message || err?.statusMessage

    throw createError({ statusCode: status, statusMessage: serverMessage })
  }
})
