import { NextResponse } from "next/server";

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function createHttpError(status: number, message: string) {
  return new HttpError(status, message);
}

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function handleRouteError(error: unknown) {
  const status = error instanceof HttpError ? error.status : 500;
  const message = error instanceof Error ? error.message : "Unexpected server error";

  return NextResponse.json({ success: false, message }, { status });
}

export async function readJson(request: Request) {
  return (await request.json().catch(() => ({}))) as Record<string, unknown>;
}
