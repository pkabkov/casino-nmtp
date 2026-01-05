const API_BASE = "/api" as const;

export const FrontPaths = {
  API: API_BASE,
  TOTAL_STAT: `${API_BASE}/users/stats/total`,
  RATING_POS: `${API_BASE}/users/stats/rating`,
  LAST_GAMES: `${API_BASE}/users/stats/perGame/lastTen`,
  TOTAL_PER_GAME:`${API_BASE}/users/stats/perGame/total`,
  UPDATE_INFO: `${API_BASE}/updateInfo`,
  LOGIN: `${API_BASE}/login`,
  REGISTER: `${API_BASE}/register`,

} as const;

export type RoutePath = typeof FrontPaths[keyof typeof FrontPaths];



