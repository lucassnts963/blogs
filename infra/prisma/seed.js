const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

function createUUIDFile(uuid, filename = "uuid.txt") {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, uuid, "utf8");
  console.log(`Arquivo ${filename} criado com UUID: ${uuid}`);
}

async function main() {
  const hashedPassword = await bcrypt.hash("123456789", 10);

  var user = await prisma.user.create({
    data: {
      email: "onordesteparaense@gmail.com",
      password: hashedPassword,
      username: "admin",
      type: "master",
    },
  });

  var blog = await prisma.blog.create({
    data: {
      name: "O Nordeste Paraense",
      category: "Notícias",
      userId: user.uuid,
    },
  });

  createUUIDFile(blog.uuid, path.join("..", "..", "public", "uuid.txt"));

  await prisma.category.createMany({
    data: [
      {
        description: "Cidades",
        blogId: blog.uuid,
      },
      {
        description: "Política",
        blogId: blog.uuid,
      },
      { description: "Brasil", blogId: blog.uuid },
      {
        description: "Economia",
        blogId: blog.uuid,
      },
      { description: "Mundo", blogId: blog.uuid },
      {
        description: "Diversão e Arte",
        blogId: blog.uuid,
      },
      {
        description: "Ciência e Saúde",
        blogId: blog.uuid,
      },
      {
        description: "Eu Estudante",
        blogId: blog.uuid,
      },
      {
        description: "Concursos",
        blogId: blog.uuid,
      },
      {
        description: "Direitos e Justiça",
        blogId: blog.uuid,
      },
      {
        description: "Publicidade Legal",
        blogId: blog.uuid,
      },
      {
        description: "Classificados",
        blogId: blog.uuid,
      },
      {
        description: "Polícia",
        blogId: blog.uuid,
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
