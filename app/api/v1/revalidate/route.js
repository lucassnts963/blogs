import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    // Revalida todas as páginas
    revalidatePath("*");

    return NextResponse.json({
      message: "Todas as páginas foram revalidadas!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao revalidar páginas" },
      { status: 500 }
    );
  }
}
