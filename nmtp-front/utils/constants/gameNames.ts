export const GameNames = {
  ROCKET: {
    english: "rocket",
    russian: "Ракета"

  },
  SWEEPER:{ 
    english: "sweeper",
    russian: "Сапёр"
  },
  SPIN_WHEEL: { 
    english : "spinWheel",
    russian: "Крути барабан",
  },

} as const;

export type GameName = typeof GameNames[keyof typeof GameNames];