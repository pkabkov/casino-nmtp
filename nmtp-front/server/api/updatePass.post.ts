export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password, newPassword, newPasswordRepeat } = body

  if (!username || !password || !newPassword || !newPasswordRepeat) {
    throw createError({
      statusCode: 400,
      statusMessage: 'VALIDATION_ERROR',
      data: {
        code: 'MISSING_FIELDS',
        message: 'Все поля обязательны для заполнения'
      }
    })
  }

  if (newPassword !== newPasswordRepeat) {
    throw createError({
      statusCode: 401,
      statusMessage: 'VALIDATION_ERROR',
      data: {
        code: 'PASSWORD_MISMATCH',
        message: 'Новые пароли не совпадают'
      }
    })
  }

  const existingUsers = [
    { username: 'admin', password: '1234' },
    { username: 'user', password: 'abcd' },
    { username: 'aa', password: '11' },
  ]

  if (password !== password) {
    throw createError({
      statusCode: 402,
      statusMessage: 'INVALID_PASSWORD',
      data: {
        code: 'INVALID_PASSWORD',
        message: 'Неверный пароль'
      }
    })
  }

  const oldPassword = existingUsers.find(
    u => u.username === username 
  )?.password || ''

  if (oldPassword !== password) {
    throw createError({
      statusCode: 403,
      statusMessage: 'INVALID_PASSWORD',
      data: {
        code: 'INVALID_PASSWORD',
        message: 'Неверный логин или пароль'
      }
    })
  }
//   Пока что нельзя менять логин и нужно обязательно вводить слой логин для смены пароля
//   if (isLoginTaken) {
//     throw createError({
//       statusCode: 400,
//       statusMessage: 'USERNAME_TAKEN',
//       data: {
//         code: 'USERNAME_TAKEN',
//         message: 'Логин уже занят'
//       }
//     })
//   }

  return {
    status: 'success',
    code: 'PASSWORD_CHANGED',
    message: 'Пароль успешно изменён'
  }
})
