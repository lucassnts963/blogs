const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding the database...");

  await prisma.category.createMany({
    data: [
      {
        description: "Cidades",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      {
        description: "Política",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      { description: "Brasil", blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8" },
      {
        description: "Economia",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      { description: "Mundo", blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8" },
      {
        description: "Diversão e Arte",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      {
        description: "Ciência e Saúde",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      {
        description: "Eu Estudante",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      {
        description: "Concursos",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      {
        description: "Direitos e Justiça",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      {
        description: "Publicidade Legal",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      {
        description: "Classificados",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
      {
        description: "Polícia",
        blogId: "e3df6c7f-bcf7-4a0d-a7cb-136b7630d8a8",
      },
    ],
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
