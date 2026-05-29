import { addItem } from "@/lib/server/lists";
import { getOptionalAuthUser } from "@/lib/server/auth";
import { handleRouteError, readJson, success } from "@/lib/server/http";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const list = await addItem(id, await readJson(request), getOptionalAuthUser(request));
    return success({ list });
  } catch (error) {
    return handleRouteError(error);
  }
}
