import { NextResponse } from "next/server";
import { ready } from "@/lib/db.server";

export async function GET() {
  await ready();
  return NextResponse.json({ status: "ok" });
}
