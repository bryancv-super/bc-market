import { handleRouteError, readJson, success } from "@/lib/server/http";
import { signup } from "@/lib/server/auth";

export async function POST(request: Request) {
  try {
    const result = await signup(await readJson(request));
    return success(result, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}
