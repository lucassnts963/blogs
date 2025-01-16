// app/api/categories/[slug]/route.js
import { NextResponse } from "next/server";
import Category from "models/category";

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    // Buscar todas as categorias para encontrar o UUID correspondente ao slug
    const categories = await Category.findAll();
    const category = categories.find(
      (cat) =>
        cat.description.toLowerCase().replace(/\s+/g, "-") ===
        slug.toLowerCase()
    );

    if (!category) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    // Aqui você poderia adicionar mais queries para buscar as notícias relacionadas
    // Por enquanto, usando dados mockados como exemplo
    const categoryNews = [
      {
        title: `Notícia 1 de ${category.description}`,
        description: "Descrição da notícia",
        image: "/api/placeholder/800/600",
      },
      // ... outros itens de notícias
    ];

    const generalNews = [
      {
        title: "Última notícia 1",
        description: "Descrição da última notícia",
        link: "/noticia/1",
      },
      // ... outras notícias gerais
    ];

    return NextResponse.json({
      category,
      categoryNews,
      generalNews,
    });
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
