import { recoverPassword } from "@/lib/server/auth";
import { handleRouteError, readJson, success } from "@/lib/server/http";

function getAppUrl(request: Request) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (configuredUrl) {
    return configuredUrl;
  }

  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(request: Request) {
  try {
    const result = await recoverPassword(await readJson(request), getAppUrl(request));
    return success(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
