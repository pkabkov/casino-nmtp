const API_BASE = "http://localhost:8080/api" as const;

export const RoutePaths = {
  API: API_BASE,
  AUTH: `${API_BASE}/auth`,
  REGISTER_GAME: `${API_BASE}/game`
  
} as const;

export type RoutePath = typeof RoutePaths[keyof typeof RoutePaths];



