import { NextResponse } from "next/server";
import database from "infra/database";

const prisma = database.prisma;

// Criar um anúncio
export async function POST(req) {
  try {
    const body = await req.json();

    // Validação básica dos dados
    if (!body.imageUrl || !body.userId || !body.type) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      );
    }

    const newAd = await prisma.ad.create({
      data: {
        imageUrl: body.imageUrl,
        userId: body.userId,
        type: body.type,
      },
    });

    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar anúncio" },
      { status: 500 }
    );
  }
}

// Ler anúncios (todos ou por ID)
export async function GET(req) {
  const url = new URL(req.url);
  const adId = url.searchParams.get("id");

  if (adId) {
    // Buscar um anúncio específico
    try {
      const ad = await prisma.ad.findUnique({
        where: {
          uuid: adId,
        },
      });
      if (!ad) {
        return NextResponse.json(
          { error: "Anúncio não encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json(ad);
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao buscar anúncio" },
        { status: 500 }
      );
    }
  } else {
    // Buscar todos os anúncios
    try {
      const ads = await prisma.ad.findMany();
      return NextResponse.json(ads);
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao buscar anúncios" },
        { status: 500 }
      );
    }
  }
}

// Atualizar um anúncio (PUT)
export async function PUT(req) {
  try {
    const { uuid, imageUrl, userId, type } = await req.json();

    if (!uuid || !imageUrl || !userId || !type) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      );
    }

    const updatedAd = await prisma.ad.update({
      where: {
        uuid,
      },
      data: {
        imageUrl,
        userId,
        type,
      },
    });

    return NextResponse.json(updatedAd);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar anúncio" },
      { status: 500 }
    );
  }
}

// Deletar um anúncio (DELETE)
export async function DELETE(req) {
  const url = new URL(req.url);
  const adId = url.searchParams.get("id");

  if (!adId) {
    return NextResponse.json(
      { error: "ID do anúncio não fornecido" },
      { status: 400 }
    );
  }

  try {
    await prisma.ad.delete({
      where: {
        uuid: adId,
      },
    });
    return NextResponse.json({ message: "Anúncio deletado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar anúncio" },
      { status: 500 }
    );
  }
}
