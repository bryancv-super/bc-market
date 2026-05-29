const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type AuthUser = {
  id: string;
  username: string;
  email: string;
  profileImage: string | null;
};

type AuthResult = {
  user: AuthUser;
  token: string;
};

async function request<T>(path: string, options: RequestInit) {
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

export function saveAuthSession(auth: AuthResult) {
  window.localStorage.setItem("bc-market-token", auth.token);
  window.localStorage.setItem("bc-market-user", JSON.stringify(auth.user));
}

export function login(email: string, password: string) {
  return request<AuthResult>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function signup(username: string, email: string, password: string, passwordConfirmation: string) {
  return request<AuthResult>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password, passwordConfirmation }),
  });
}

export function recoverPassword(email: string) {
  return request<{ message: string; resetToken: string }>("/auth/recover-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, password: string, passwordConfirmation: string) {
  return request<{ message: string }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password, passwordConfirmation }),
  });
}
