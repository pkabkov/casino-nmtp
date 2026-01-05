export interface LeaderboardEntry {
  position: number;
  login: string;
  balance: number;
};

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
};