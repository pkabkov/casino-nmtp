import {RoutePaths} from "~/utils/constants/backEndRoutes"
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    await $fetch(RoutePaths.REGISTER_GAME,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }
    )
  } catch (err) {
    console.error('API ERROR:', err)
    throw err
  }
})
