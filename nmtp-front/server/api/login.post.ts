export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing username or password'
    })
  }

  if (username === 'aa' && password === '11') {
    return {
      message: 'Login successful!',
      user: { username, password }
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials'
  })
})