export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api-massoai.onrender.com";

export const API_ENDPOINTS = {
  // Auth
  REGISTER: `${API_BASE_URL}/api/v1/users/register`,
  LOGIN: `${API_BASE_URL}/api/v1/users/login`,
  PROFILE: `${API_BASE_URL}/api/v1/users/profile`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  GOOGLE_LOGIN: `${API_BASE_URL}/auth/google`,

  // Projects
  PROJECTS_CREATE: `${API_BASE_URL}/api/v1/projects/create`,
  PROJECTS_LIST: `${API_BASE_URL}/api/v1/projects/list`,
  PROJECTS_GET: `${API_BASE_URL}/api/v1/projects/get`,
  PROJECTS_UPDATE: `${API_BASE_URL}/api/v1/projects/update`,
  PROJECTS_DELETE: `${API_BASE_URL}/api/v1/projects/delete`,

  // Developers
  DEVELOPERS_LIST: `${API_BASE_URL}/api/v1/developers/list`,
  DEVELOPERS_GET: `${API_BASE_URL}/api/v1/developers/get`,

  // Bookings
  BOOKINGS_CREATE: `${API_BASE_URL}/api/v1/bookings/create`,
  BOOKINGS_LIST: `${API_BASE_URL}/api/v1/bookings/list`,
  BOOKINGS_GET: `${API_BASE_URL}/api/v1/bookings/get`,

  // Profile
  PROFILE_GET: `${API_BASE_URL}/api/v1/profile/get`,
  PROFILE_UPDATE: `${API_BASE_URL}/api/v1/profile/update`,
  PROFILE_PASSWORD: `${API_BASE_URL}/api/v1/profile/password`,
  PROFILE_SETTINGS: `${API_BASE_URL}/api/v1/profile/settings`,
  PROFILE_DELETE: `${API_BASE_URL}/api/v1/profile/delete`,

  // AI
  AI_GENERATE: `${API_BASE_URL}/api/v1/ai/generate`,
  AI_PREVIEW: (projectId: number | string) => `${API_BASE_URL}/api/v1/ai/preview/${projectId}`,
};
