import { removeItem, updateItem } from "@/lib/server/lists";
import { getOptionalAuthUser } from "@/lib/server/auth";
import { handleRouteError, readJson, success } from "@/lib/server/http";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string; itemId: string }> },
) {
  try {
    const { id, itemId } = await context.params;
    const list = await updateItem(id, itemId, await readJson(request), getOptionalAuthUser(request));
    return success({ list });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string; itemId: string }> },
) {
  try {
    const { id, itemId } = await context.params;
    const list = await removeItem(id, itemId, getOptionalAuthUser(request));
    return success({ list });
  } catch (error) {
    return handleRouteError(error);
  }
}
