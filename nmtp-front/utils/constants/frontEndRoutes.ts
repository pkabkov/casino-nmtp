const API_BASE = "/api" as const;

export const FrontPaths = {
  API: API_BASE,
  TOTAL_STAT: `${API_BASE}/users/stats/total`,

} as const;

export type RoutePath = typeof FrontPaths[keyof typeof FrontPaths];



