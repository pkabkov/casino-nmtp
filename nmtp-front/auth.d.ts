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
}
