import { apiRequest } from "@/lib/api/client";

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

export function saveAuthSession(auth: AuthResult) {
  window.localStorage.setItem("bc-market-token", auth.token);
  window.localStorage.setItem("bc-market-user", JSON.stringify(auth.user));
}

export function login(email: string, password: string) {
  return apiRequest<AuthResult>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function signup(username: string, email: string, password: string, passwordConfirmation: string) {
  return apiRequest<AuthResult>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password, passwordConfirmation }),
  });
}

export function recoverPassword(email: string) {
  return apiRequest<{ message: string; resetToken: string }>("/auth/recover-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, password: string, passwordConfirmation: string) {
  return apiRequest<{ message: string }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password, passwordConfirmation }),
  });
}
