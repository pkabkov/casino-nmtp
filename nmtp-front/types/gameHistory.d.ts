import type { GameRecord } from "./game";

export interface GameHistory{
    name: string,
    played: number,
    spent: number,
    won: number,
    history: GameRecord[]
}