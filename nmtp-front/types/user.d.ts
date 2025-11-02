import type { GameHistory } from "./gameHistory";

export interface User {
  id: string,
  score: number,
  place: number,
  spent: number,
  won: number,
  played: number,
  faveGame: string,
  playedFave: number,
  games: GameHistory[]
}