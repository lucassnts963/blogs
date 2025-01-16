// app/api/v1/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJWT } from "lib/auth";

import User from "models/user";

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

    // Verifica se usuário já existe
    // const userExists = await User.findOneByEmail(email);
    // console.log(userExists);

    // if (userExists) {
    //   return NextResponse.json(
    //     { error: "Email já cadastrado" },
    //     { status: 400 }
    //   );
    // }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere novo usuário
    const result = await User.create({
      email,
      username,
      type: "user",
      password: hashedPassword,
    });

    // Gera token JWT
    const token = await signJWT({
      id: result.rows[0].id,
      email: result.rows[0].email,
    });

    return NextResponse.json({
      user: result.rows[0],
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao registrar usuário", details: error.message },
      { status: 400 }
    );
  }
}
