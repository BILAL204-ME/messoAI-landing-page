/**
 * Authenticated API client.
 * Wraps fetch with automatic Bearer token injection and 401 retry logic.
 */

let accessTokenStore: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Set the current access token (called by AuthProvider on login/refresh).
 */
export const setAccessToken = (token: string | null) => {
  accessTokenStore = token;
};

/**
 * Get the current access token.
 */
export const getAccessToken = () => accessTokenStore;

/**
 * Attempt to refresh the access token.
 * Deduplicates concurrent refresh calls.
 */
const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const { API_ENDPOINTS } = await import('./api-config');
      const response = await fetch(API_ENDPOINTS.REFRESH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        accessTokenStore = data.accessToken;
        return data.accessToken;
      }
      accessTokenStore = null;
      return null;
    } catch {
      accessTokenStore = null;
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

interface ApiOptions {
  /** Skip authentication (for public endpoints like developer listing) */
  public?: boolean;
}

/**
 * Make an authenticated POST request.
 * Automatically attaches Bearer token and retries once on 401.
 */
export async function apiPost<T = unknown>(
  url: string,
  body: Record<string, unknown> = {},
  options: ApiOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (!options.public && accessTokenStore) {
    headers['Authorization'] = `Bearer ${accessTokenStore}`;
  }

  let response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    credentials: 'include',
  });

  // If 401 and not a public endpoint, try refreshing the token once
  if (response.status === 401 && !options.public) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        credentials: 'include',
      });
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw { ...data, status: response.status };
  }

  return data as T;
}

interface ApiGetOptions extends ApiOptions {
  queryParams?: Record<string, string | number>;
}

/**
 * Make an authenticated GET request.
 */
export async function apiGet<T = unknown>(
  url: string,
  options: ApiGetOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (!options.public && accessTokenStore) {
    headers['Authorization'] = `Bearer ${accessTokenStore}`;
  }

  let fetchUrl = url;
  if (options.queryParams) {
    const params = new URLSearchParams(
      options.queryParams as Record<string, string>
    ).toString();
    fetchUrl += `?${params}`;
  }

  let response = await fetch(fetchUrl, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  if (response.status === 401 && !options.public) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(fetchUrl, {
        method: 'GET',
        headers,
        credentials: 'include',
      });
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw { ...data, status: response.status };
  }

  return data as T;
}
