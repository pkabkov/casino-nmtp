import type { Ref, InjectionKey } from 'vue'

export interface DemoGameContext {
  demoGame: Ref<boolean>
  changeDemoStatus: () => void
}

export const demoGameKey: InjectionKey<DemoGameContext> = Symbol('demoGame')
