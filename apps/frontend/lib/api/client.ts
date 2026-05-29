const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data as T;
}
