import { mockLists, mockProducts, mockUser, ShoppingList } from "@/lib/mock/data";
import { apiRequest } from "@/lib/api/client";

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
  user: typeof mockUser;
};

async function withMockFallback<T>(request: () => Promise<T>, fallback: T) {
  try {
    return await request();
  } catch {
    return fallback;
  }
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
  return withMockFallback(
    async () =>
      (
        await apiRequest<ProfileResponse>("/profile", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      ).user,
    mockUser,
  );
}
