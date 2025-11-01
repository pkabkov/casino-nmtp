export const useAuthErrorMessage = (err: any): string => {
  const status = err?.status ?? err?.statusCode

  const map = new Map([
    [400, 'Пожалуйста, заполните все поля.'],
    [401, 'Неверное имя пользователя или пароль.'],
    [500, 'Ошибка сервера. Попробуйте позже.'],
  ])

  if (map.has(status)) return map.get(status)!

  if (err?.data?.message) return err.data.message

  return 'Не удалось выполнить вход.'
}