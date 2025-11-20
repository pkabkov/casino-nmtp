export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body
  const query = getQuery(event)

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing username or password'
    })
  }

  if (username === 'aa' && password === '11') {
    await setUserSession(event, {
      user: {
        id: 'Логин1',
        balance: 12
      },
      secure: {
        apiToken: '1234567890'
      },
    })
    return {
      message: 'Login successful!',
      user: { username, password },
      id: '1'
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials'
  })
})