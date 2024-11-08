import User from "models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const users = await User.findAll();
    return NextResponse.json({ records: users, status_code: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, status_code: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { username, email, type } = body;

    const user = await User.create({ username, email, type });

    return NextResponse.json({ status_code: 200, record: user });
  } catch (error) {
    return NextResponse.json({ message: error.message, status_code: 500 });
  }
}
