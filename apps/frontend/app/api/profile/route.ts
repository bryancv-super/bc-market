import { getAuthUser, getUserProfile, updateUserProfile } from "@/lib/server/auth";
import { handleRouteError, readJson, success } from "@/lib/server/http";

export async function GET(request: Request) {
  try {
    const authUser = getAuthUser(request);
    const user = await getUserProfile(authUser.id);
    return success({ user });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const authUser = getAuthUser(request);
    const user = await updateUserProfile(authUser.id, await readJson(request));
    return success({ user });
  } catch (error) {
    return handleRouteError(error);
  }
}
