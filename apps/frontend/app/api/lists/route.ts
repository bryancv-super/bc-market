import { createList, getLists } from "@/lib/server/lists";
import { getOptionalAuthUser } from "@/lib/server/auth";
import { handleRouteError, readJson, success } from "@/lib/server/http";

export async function GET(request: Request) {
  try {
    const authUser = getOptionalAuthUser(request);
    return success({ lists: await getLists(authUser) });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const authUser = getOptionalAuthUser(request);
    const list = await createList(await readJson(request), authUser);
    return success({ list }, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}
