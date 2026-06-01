import { recoverPassword } from "@/lib/server/auth";
import { handleRouteError, readJson, success } from "@/lib/server/http";

function normalizeAppUrl(value: string | undefined) {
  const url = value?.trim();

  if (!url) {
    return "";
  }

  const urlWithProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;

  try {
    return new URL(urlWithProtocol).origin;
  } catch {
    return "";
  }
}

function getAppUrl(request: Request) {
  const configuredUrl =
    normalizeAppUrl(process.env.APP_URL) ||
    normalizeAppUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL) ||
    normalizeAppUrl(process.env.VERCEL_URL);

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
