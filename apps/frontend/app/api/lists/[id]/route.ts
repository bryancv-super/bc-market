import { deleteList, getList } from "@/lib/server/lists";
import { getOptionalAuthUser } from "@/lib/server/auth";
import { handleRouteError, success } from "@/lib/server/http";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    return success({ list: await getList(id, getOptionalAuthUser(request)) });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await deleteList(id, getOptionalAuthUser(request));
    return success({ message: "List deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
