export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing username или password'
    })
  }

  if (username === 'aa' && password === '11') {
    return {
      message: 'Login successful!',
      user: { username }
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials'
  })
})