// app/api/v1/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJWT } from "lib/auth";

import User from "models/user";
import { EmailNotFound } from "error/EmailNotFound";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*", // Ajuste para o domínio da aplicação Flutter em produção
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

export async function POST(request) {
  try {
    const { email, password, username } = await request.json();

    try {
      await User.findOneByEmail(email);
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    } catch (error) {
      if (!(error instanceof EmailNotFound)) {
        throw error;
      }
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere novo usuário
    const user = await User.create({
      email,
      username,
      type: "user",
      password: hashedPassword,
    });

    // Gera token JWT
    const token = await signJWT({
      id: user.uuid,
      email: user.email,
    });

    return NextResponse.json({
      user: user.uuid,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao registrar usuário", details: error.message },
      { status: 400 }
    );
  }
}
