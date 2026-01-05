const API_BASE = "http://localhost:8080/api" as const;

export const RoutePaths = {
  API: API_BASE,
  AUTH: `${API_BASE}/auth`,
  REGISTER_GAME: `${API_BASE}/game`,
  PROFILE: `${API_BASE}/profile`,
  DELETE: `${API_BASE}/delete`,
  TOTAL_STAT: `${API_BASE}/total-statistics`,
  RATING_POS: `${API_BASE}/leaderboard`,
  LAST_GAMES: `${API_BASE}/last-games`,
  TOTAL_PER_GAME:`${API_BASE}/statistics`,
  EDIT: `${API_BASE}/edit`,
  REGISTER: `${API_BASE}/register`,
  LEADER_BOARD: `${API_BASE}/leaderboard`,

} as const;

export type RoutePath = typeof RoutePaths[keyof typeof RoutePaths];



