export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password, passwordConfirm } = body

  if (!username || !password || !passwordConfirm) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing username or password or passwordConfirm'
    })
  }

  if (username === 'aa') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username already exist'
    })
  }
  if (password !== passwordConfirm) {
    throw createError({
      statusCode: 402,
      statusMessage: 'Passwords don`t match'
    })
  }
  if (username === 'bb' && password === '22') {
    return {
      message: 'Login successful!',
      user: { username, password },
      id: '2'
    }
  }
  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials'
  })
})