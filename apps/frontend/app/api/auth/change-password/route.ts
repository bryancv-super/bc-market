import { changePassword, getAuthUser } from "@/lib/server/auth";
import { handleRouteError, readJson, success } from "@/lib/server/http";

export async function POST(request: Request) {
  try {
    const authUser = getAuthUser(request);
    return success(await changePassword(authUser.id, await readJson(request)));
  } catch (error) {
    return handleRouteError(error);
  }
}
