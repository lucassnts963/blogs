import { NextResponse } from "next/server";

import Blog from "models/blog";

export async function GET(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  const blogs = await Blog.findAll({ userId });

  return NextResponse.json([...blogs]);
}

export async function POST(request) {
  const { userId, name, category } = await request.json();
  const blog = await Blog.create({ userId, name, category });
  return NextResponse.json({ ...blog });
}
