import { resetPassword } from "@/lib/server/auth";
import { handleRouteError, readJson, success } from "@/lib/server/http";

export async function POST(request: Request) {
  try {
    return success(await resetPassword(await readJson(request)));
  } catch (error) {
    return handleRouteError(error);
  }
}
