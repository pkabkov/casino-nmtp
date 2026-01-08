import {RoutePaths} from "~/utils/constants/backEndRoutes"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { login } = body
    try{
        await $fetch(RoutePaths.DELETE, {
                method: 'DELETE',
                body: {
                    login: login
                }
            })
        return 
    }catch(err: any){
        throw createError(err)
    }
})