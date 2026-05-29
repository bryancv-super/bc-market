import { mockLists, mockProducts, mockUser, ShoppingList } from "@/lib/mock/data";
import { apiRequest, getApiBaseUrl } from "@/lib/api/client";
import { StoredUser } from "@/lib/auth/session";

type ProductsResponse = {
  products: typeof mockProducts;
};

type ListsResponse = {
  lists: ShoppingList[];
};

type ListResponse = {
  list: ShoppingList;
};

type ProfileResponse = {
  user: StoredUser;
};

async function withMockFallback<T>(request: () => Promise<T>, fallback: T) {
  try {
    return await request();
  } catch {
    return fallback;
  }
}

function normalizeUser(user: StoredUser) {
  const apiOrigin = getApiBaseUrl().replace(/\/api\/?$/, "");

  return {
    ...user,
    profileImage:
      user.profileImage && user.profileImage.startsWith("/")
        ? `${apiOrigin}${user.profileImage}`
        : user.profileImage,
  };
}

export function fetchProducts() {
  return withMockFallback(
    async () => (await apiRequest<ProductsResponse>("/products")).products,
    mockProducts,
  );
}

export function fetchLists() {
  return withMockFallback(async () => (await apiRequest<ListsResponse>("/lists")).lists, mockLists);
}

export function createRemoteList(name: string) {
  return withMockFallback(
    async () =>
      (
        await apiRequest<ListResponse>("/lists", {
          method: "POST",
          body: JSON.stringify({ name }),
        })
      ).list,
    { id: `${Date.now()}`, name, items: [] },
  );
}

export function fetchProfile(token?: string) {
  if (!token) {
    return Promise.resolve({
      id: mockUser.id,
      username: mockUser.name,
      email: mockUser.email,
      profileImage: null,
    });
  }

  return apiRequest<ProfileResponse>("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  }).then((result) => normalizeUser(result.user));
}

export function updateProfile(token: string, username: string) {
  return apiRequest<ProfileResponse>("/profile", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ username }),
  }).then((result) => ({ user: normalizeUser(result.user) }));
}

export function uploadAvatar(token: string, file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  return apiRequest<ProfileResponse & { avatarUrl: string }>("/profile/avatar", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  }).then((result) => ({ ...result, user: normalizeUser(result.user) }));
}
