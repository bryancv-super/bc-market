export type StoredUser = {
  id: string;
  username: string;
  email: string;
  profileImage: string | null;
};

const TOKEN_KEY = "bc-market-token";
const USER_KEY = "bc-market-user";

function canUseStorage() {
  return typeof window !== "undefined";
}

function notifySessionUpdated() {
  if (!canUseStorage()) {
    return;
  }

  window.dispatchEvent(new Event("bc-market-session-updated"));
}

export function getStoredToken() {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  if (!canUseStorage()) {
    return null;
  }

  const rawUser = window.localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as StoredUser;
  } catch {
    return null;
  }
}

export function updateStoredUser(user: StoredUser) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  notifySessionUpdated();
}

export function saveAuthSession(auth: { token: string; user: StoredUser }) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, auth.token);
  updateStoredUser(auth.user);
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  notifySessionUpdated();
}

export function isAuthenticated() {
  return Boolean(getStoredToken());
}
