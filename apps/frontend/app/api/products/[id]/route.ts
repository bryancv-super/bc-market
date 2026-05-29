import { getProduct } from "@/lib/server/products";
import { handleRouteError, success } from "@/lib/server/http";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    return success({ product: await getProduct(id) });
  } catch (error) {
    return handleRouteError(error);
  }
}
