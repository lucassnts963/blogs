import database from "infra/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.SKIP_DB_DURING_BUILD === "true"
  ) {
    return NextResponse.json([]);
  }
  const categories = await database.prisma.category.findMany();
  return NextResponse.json(categories);
}
