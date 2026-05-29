import { success } from "@/lib/server/http";

export function GET() {
  return success({ status: "ok", service: "bc-market-api" });
}
