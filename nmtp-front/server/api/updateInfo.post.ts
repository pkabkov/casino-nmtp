import {FrontPaths} from "~/utils/constants/frontEndRoutes"
import type {PatchBody} from "~/types/patchUserInfo"
import { RoutePaths } from "~/utils/constants/backEndRoutes"
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { login, newLogin, password, newPassword, newPasswordRepeat} = body

  if (!password) {
    throw createError({
      statusCode: 403,
      data: {
        code: 403,
        message: 'Заполните обязательное поле!'
      }
    })
  }
  // console.log(newPassword, "new pass")
  // console.log(newPasswordRepeat, "new pass repeat")
  // console.log("uuu")
  if (newPassword){
    if(!newPasswordRepeat){
      throw createError({
        statusCode: 403,
        data: {
          code: 404,
          message: 'Заполните обязательное поле!'
        }
      })
    }
  }

  if (newPassword &&  newPassword !== newPasswordRepeat) {
    throw createError({
      statusCode: 403,
      data: {
        code: 405,
        message: 'Пароли не совпадают!'
      }
    })
  }

  if (!(await passwordValid(login, password))) {
    throw createError({
      statusCode: 403,
      data: {
        code: 406,
        message: 'Неверный пароль!'
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
  await updateInfo(login, newLogin, newPassword)
  const session = await getUserSession(event)
  await setUserSession(event, {
          ...session,
          user: {
          ...session.user,
          id: newLogin ?? login
          }
  })
  return {
    status: 'success',
    code: 'PASSWORD_CHANGED',
    message: 'Пароль успешно изменён'
  }
})

async function passwordValid(login: string ,password: string){
  try{
    await $fetch(FrontPaths.LOGIN, {
      method: 'POST',
      body: {
        login: login.trim(),
        password: password.trim()
      }
    })
    return true
  }catch(err: any){
    return false
  }
}
async function updateInfo(login: string, newLogin?: string, newPassword?: string){
  let bodyToSend: PatchBody = {}
  bodyToSend.login = login
  if (newLogin) bodyToSend.newLogin = newLogin
  if (newPassword) bodyToSend.password = newPassword
  try{
    await $fetch<{ login: string }>(
          RoutePaths.EDIT,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: bodyToSend
          }
    )
  }catch(err: any){
    throw createError({
      statusCode: 403,
      data: {
        code: 409,
        message: 'Логин занят!'
      }
    })
  }
}
