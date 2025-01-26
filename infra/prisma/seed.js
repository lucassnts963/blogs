const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding the database...");

  await prisma.category.createMany({
    data: [
      { description: "Cidades" },
      { description: "Política" },
      { description: "Brasil" },
      { description: "Economia" },
      { description: "Mundo" },
      { description: "Diversão e Arte" },
      { description: "Ciência e Saúde" },
      { description: "Eu Estudante" },
      { description: "Concursos" },
      { description: "Direitos e Justiça" },
      { description: "Publicidade Legal" },
      { description: "Classificados" },
      { description: "Polícia" },
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
