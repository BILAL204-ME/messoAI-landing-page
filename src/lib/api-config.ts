export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api-massoai.onrender.com";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/v1/users/register`,
  LOGIN: `${API_BASE_URL}/api/v1/users/login`,
  PROFILE: `${API_BASE_URL}/api/v1/users/profile`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};
