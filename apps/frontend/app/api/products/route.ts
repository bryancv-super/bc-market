import { getProducts } from "@/lib/server/products";
import { handleRouteError, success } from "@/lib/server/http";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const products = await getProducts({
      search: url.searchParams.get("search"),
      category: url.searchParams.get("category"),
      categories: url.searchParams.get("categories"),
    });

    return success({ products });
  } catch (error) {
    return handleRouteError(error);
  }
}
