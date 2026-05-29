import { getAuthUser, getUserProfile } from "@/lib/server/auth";
import { handleRouteError, success } from "@/lib/server/http";

export async function GET(request: Request) {
  try {
    const authUser = getAuthUser(request);
    const user = await getUserProfile(authUser.id);
    return success({ user });
  } catch (error) {
    return handleRouteError(error);
  }
}
