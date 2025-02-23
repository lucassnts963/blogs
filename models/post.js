import database from "infra/database";
import { extractFirstImagefromMarkdown } from "lib/utils";

/**
 * @typedef {Object} Post
 * @property {string} uuid - UUID do post
 * @property {string} blogId - UUID do blog relacionado
 * @property {string} title - Título do post
 * @property {string} [subtitle] - Subtítulo opcional do post
 * @property {string} slug - Slug do post para URL
 * @property {string} content - Conteúdo do post
 * @property {string} categoryId - UUID da categoria
 * @property {Date} postedAt - Data de publicação
 * @property {Date} createdAt - Data de criação
 * @property {Date} updatedAt - Data de atualização
 */

// CREATE
/**
 * @param {Object} fields
 * @param {string} fields.blogId - UUID do blog
 * @param {string} fields.title - Título do post
 * @param {string} [fields.subtitle] - Subtítulo opcional
 * @param {string} fields.slug - Slug para URL
 * @param {string} fields.content - Conteúdo do post
 * @param {string} fields.categoryId - UUID da categoria
 * @param {Date} [fields.postedAt] - Data de publicação opcional
 * @returns {Promise<Post>}
 */
async function create({
  blogId,
  title,
  subtitle,
  slug,
  content,
  categoryId,
  postedAt,
}) {
  try {
    const post = await database.prisma.post.create({
      data: {
        blogId,
        title,
        subtitle,
        slug,
        content,
        categoryId,
        postedAt: postedAt || new Date(),
      },
    });
    return post;
  } catch (error) {
    throw error;
  }
}

// READ
/**
 * @param {Object} [options]
 * @param {number} [options.limit=10] - Limite de registros
 * @param {number} [options.offset=0] - Offset para paginação
 * @param {string} [options.blogId] - Offset para paginação
 * @returns {Promise<Post[]>}
 */
async function findAll({ limit = 10, offset = 0, blogId, userId } = {}) {
  try {
    if (userId) {
      const posts = await database.prisma.post.findMany({
        where: { blog: { userId } },
      });

      return posts.map((post) => ({
        imageUrl: extractFirstImagefromMarkdown(post.content),
        ...post,
      }));
    }

    if (blogId) {
      const posts = await database.prisma.post.findMany({
        where: { blogId },
      });

      return posts.map((post) => ({
        imageUrl: extractFirstImagefromMarkdown(post.content),
        ...post,
      }));
    }

    const posts = await database.prisma.post.findMany();

    return posts.map((post) => ({
      imageUrl: extractFirstImagefromMarkdown(post.content),
      ...post,
    }));
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} uuid - UUID do post
 * @returns {Promise<Post>}
 */
async function findOneById(uuid) {
  try {
    const post = database.prisma.post.findFirst({
      where: { uuid },
      include: {
        category: {
          select: {
            description: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post não encontrado");
    }

    return post;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} slug - Slug do post
 * @returns {Promise<Post>}
 */
async function findOneBySlug(slug) {
  try {
    const post = database.prisma.post.findFirst({
      where: { slug },
      include: {
        category: {
          select: {
            description: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post não encontrado");
    }

    return post;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} categoryId - UUID da categoria
 * @param {Object} [options]
 * @param {number} [options.limit=10] - Limite de registros
 * @param {number} [options.offset=0] - Offset para paginação
 * @returns {Promise<Post[]>}
 */
async function findByCategory(categoryId, { limit = 10, offset = 0 } = {}) {
  try {
    const result = await database.query({
      text: `
        SELECT p.*, c.name as category_name
        FROM posts p
        LEFT JOIN categories c ON p.categoryId = c.uuid
        WHERE p.categoryId = $1
        ORDER BY p.postedAt DESC
        LIMIT $2 OFFSET $3
      `,
      values: [categoryId, limit, offset],
    });

    return result.rows;
  } catch (error) {
    throw error;
  }
}

// UPDATE
/**
 * @param {string} uuid - UUID do post
 * @param {Object} fields - Campos para atualizar
 * @param {string} [fields.title] - Novo título
 * @param {string} [fields.subtitle] - Novo subtítulo
 * @param {string} [fields.slug] - Novo slug
 * @param {string} [fields.content] - Novo conteúdo
 * @param {string} [fields.categoryId] - Nova categoria
 * @param {Date} [fields.postedAt] - Nova data de publicação
 * @returns {Promise<Post>}
 */
async function update(uuid, fields) {
  const validFields = [
    "title",
    "subtitle",
    "slug",
    "content",
    "categoryId",
    "postedAt",
  ];
  const setValues = [];
  const values = [uuid];
  let paramCount = 2;

  for (const [key, value] of Object.entries(fields)) {
    if (validFields.includes(key) && value !== undefined) {
      setValues.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  }

  if (setValues.length === 0) {
    throw new Error("Nenhum campo válido para atualização");
  }

  try {
    const result = await database.query({
      text: `
        UPDATE posts
        SET ${setValues.join(", ")}, updatedAt = NOW()
        WHERE uuid = $1
        RETURNING *
      `,
      values,
    });

    if (result.rows.length <= 0) {
      throw new Error("Post não encontrado");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// DELETE
/**
 * @param {string} uuid - UUID do post
 * @returns {Promise<Post>}
 */
async function del(uuid) {
  try {
    const result = await database.query({
      text: "DELETE FROM posts WHERE uuid = $1 RETURNING *",
      values: [uuid],
    });

    if (result.rows.length <= 0) {
      throw new Error("Post não encontrado");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} searchTerm - Termo para busca
 * @param {Object} [options]
 * @param {number} [options.limit=10] - Limite de registros
 * @param {number} [options.offset=0] - Offset para paginação
 * @param {string} [options.blogId] - Filtrar por blog específico
 * @param {string} [options.categoryId] - Filtrar por categoria específica
 * @returns {Promise<Post[]>}
 */
async function search(
  searchTerm,
  { limit = 10, offset = 0, blogId, categoryId } = {}
) {
  try {
    const whereConditions = [];
    const values = [`%${searchTerm}%`];
    let paramCount = 2;

    // Condição base de busca
    whereConditions.push(`(
      p.title ILIKE $1 OR 
      p.subtitle ILIKE $1 OR 
      p.content ILIKE $1
    )`);

    // Adiciona filtro por blog se especificado
    if (blogId) {
      whereConditions.push(`p.blogId = $${paramCount}`);
      values.push(blogId);
      paramCount++;
    }

    // Adiciona filtro por categoria se especificado
    if (categoryId) {
      whereConditions.push(`p.categoryId = $${paramCount}`);
      values.push(categoryId);
      paramCount++;
    }

    const result = await database.query({
      text: `
        SELECT 
          p.*,
          c.name as category_name
        FROM posts p
        LEFT JOIN categories c ON p.categoryId = c.uuid
        WHERE ${whereConditions.join(" AND ")}
        ORDER BY p.postedAt DESC
        LIMIT $${paramCount} OFFSET $${paramCount + 1}
      `,
      values: [...values, limit, offset],
    });

    return result.rows;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} slug - Slug do post para busca
 * @returns {Promise<Post | null>} Post encontrado ou null se não existir
 * @throws {Error} Se houver erro na consulta
 */
async function findBySlug(slug) {
  try {
    const result = await database.query({
      text: `
        SELECT 
          *
        FROM posts p
        WHERE p.slug = $1
        LIMIT 1
      `,
      values: [slug],
    });

    if (result.rows.length <= 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  findAll,
  findOneById,
  findOneBySlug,
  findByCategory,
  update,
  delete: del,
  search,
  findBySlug,
};
