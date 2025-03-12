// app/api/posts/route.js
import { NextResponse } from "next/server";
import Post from "models/post";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const userId = searchParams.get("userId");
    const blogId = searchParams.get("blogId");
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    let posts;

    if (slug) {
      posts = await Post.findBySlug(slug);
    } else if (categoryId) {
      posts = await Post.findByCategory(categoryId, { limit, offset });
    } else if (search) {
      posts = await Post.search(search, { limit, offset });
    } else if (userId) {
      posts = await Post.findAll({ limit, offset, userId });
    } else if (blogId) {
      posts = await Post.findAll({ limit, offset, blogId });
    } else {
      posts = await Post.findAll({ limit, offset });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error in GET /api/v1/blogs/posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const post = await Post.create(body);

    revalidatePath("/");

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { uuid, ...updateData } = body;

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    const post = await Post.update(uuid, updateData);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error in PUT /api/posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    const post = await Post.delete(uuid);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error in DELETE /api/posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
