import { NextResponse } from "next/server";

/** 部署探活、监控；无需鉴权 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "dtc-site",
    time: new Date().toISOString(),
  });
}
