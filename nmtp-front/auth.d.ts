declare module '#auth-utils' {
  export interface User {
    id: string
    balance?: number
  }

  export function useUserSession(): {
    user: Ref<User | null>
    session: any
    loggedIn: Ref<boolean>
    clear: () => Promise<void>
  }
   interface UserSession {
    user: User
    // Add other session properties if needed
  }
  export function getUserSession(event: H3Event): Promise<UserSession>
}
