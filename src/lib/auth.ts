import type { NextRequest } from "next/server";

/** 与 POST /api/admin/login 写入的 Cookie 一致 */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "dtc-admin-2024";
}

/** 后台接口鉴权：Authorization: Bearer <ADMIN_PASSWORD> 或 Cookie admin_token */
export function isAdminRequest(request: NextRequest): boolean {
  const expected = getAdminPassword();
  const authHeader = request.headers.get("authorization");
  const cookie = request.cookies.get("admin_token")?.value;
  if (authHeader === `Bearer ${expected}` || cookie === expected) return true;
  return false;
}
