export const useSignupErrorMessage = (err: any): string => {
  const status = err?.status ?? err?.statusCode

  const map = new Map([
    [400, 'Ошибка: Пожалуйста, заполните все поля!'],
    [401, 'Ошибка: Имя пользователя уже занято!'],
    [402, 'Ошибка: Пароли не совпадают!'],
    [500, 'Ошибка сервера. Попробуйте позже.'],
  ])

  if (map.has(status)) return map.get(status)!

  if (err?.data?.message) return err.data.message

  return 'Не удалось выполнить регистрацию.'
}
