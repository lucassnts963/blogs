import database from "infra/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  const categories = await database.prisma.category.findMany();
  return NextResponse.json(categories);
}
