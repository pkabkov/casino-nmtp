import type { Ref, InjectionKey } from 'vue'

export interface DemoGameContext {
  demoGame: Readonly<Ref<boolean>>
  loggedOut: ComputedRef<boolean>
  changeDemoStatus: () => void
}


export const demoGameKey: InjectionKey<DemoGameContext> = Symbol('demoGame')
