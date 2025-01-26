import database from "infra/database";

/**
 * @param fields {name: string, category: string}
 * @returns {Promise<{uuid: string, name: string, category: string, create: Date}>}
 */
async function create({ name, category, userId }) {
  const blog = await database.prisma.blog.create({
    data: { name, category, userId },
    select: { name: true, category: true, createdAt: true, uuid: true },
  });

  return blog;
}

async function findAll({ userId }) {
  const blogs = await database.prisma.blog.findMany({ where: { userId } });
  return blogs;
}

export default { create, findAll };
