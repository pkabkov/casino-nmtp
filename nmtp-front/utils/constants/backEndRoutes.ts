const API_BASE = "http://localhost:8080/api" as const;

export const RoutePaths = {
  API: API_BASE,
  AUTH: `${API_BASE}/auth`,
  REGISTER_GAME: `${API_BASE}/game`,
  PROFILE: `${API_BASE}/profile`,
  DELETE: `${API_BASE}/delete`,
  TOTAL_STAT: `${API_BASE}/total-statistics`,
  
} as const;

export type RoutePath = typeof RoutePaths[keyof typeof RoutePaths];



