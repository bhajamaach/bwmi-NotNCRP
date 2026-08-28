import { NextResponse } from "next/server";
import { pool, ready } from "@/lib/db.server";

export async function GET() {
  await ready();
  const result = await pool.query('SELECT id, name, mobile, is_demo AS "isDemo" FROM users ORDER BY id');
  return NextResponse.json(result.rows);
}
