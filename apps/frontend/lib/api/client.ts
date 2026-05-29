const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export function getApiBaseUrl() {
  return API_URL;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });
  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data as T;
}
