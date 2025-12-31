export const GameNames = {
  ROCKET: "rocket"

} as const;

export type GameName = typeof GameNames[keyof typeof GameNames];