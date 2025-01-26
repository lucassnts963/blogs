import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJWT } from "lib/auth";

import User from "models/user";
import { InvalidCrendetial } from "error/InvalidCredential";
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
    const { email, password } = await request.json();

    try {
      const user = await User.findOneByEmail(email);

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new InvalidCrendetial();
      }

      const token = await signJWT({
        id: user.uuid,
        username: user.username,
        email: user.email,
        level: user.type,
      });

      return NextResponse.json(
        {
          user: {
            id: user.uuid,
            email: user.email,
            username: user.username,
            level: user.type,
          },
          token,
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
    } catch (error) {
      if (
        !(error instanceof InvalidCrendetial) ||
        !(error instanceof EmailNotFound)
      ) {
        throw error;
      }

      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao fazer login", details: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
