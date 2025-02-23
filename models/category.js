import database from "infra/database";

/**
 * Cria uma nova categoria.
 * @param {string} description - A descrição da categoria.
 * @returns {Promise<{id: number, uuid: string, description: string, created_at: Date, updated_at: Date}>}
 */
async function create(description) {
  try {
    const result = await database.query({
      text: "INSERT INTO categories (description) VALUES ($1) RETURNING *",
      values: [description],
    });

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Retorna todas as categorias.
 * @returns {Promise<{id: number, uuid: string, description: string, created_at: Date, updated_at: Date}[]>}
 */
async function findAll({ blogId }) {
  try {
    const prisma = database.prisma;

    const categories = await prisma.category.findMany({
      where: { blogId },
      select: { uuid: true, description: true },
    });

    return categories;
  } catch (error) {
    throw error;
  }
}

/**
 * Retorna uma categoria pelo UUID.
 * @param {string} uuid - O UUID da categoria.
 * @returns {Promise<{id: number, uuid: string, description: string, created_at: Date, updated_at: Date}>}
 */
async function findOneByUuid(uuid) {
  try {
    const result = await database.query({
      text: "SELECT * FROM categories WHERE uuid = $1",
      values: [uuid],
    });

    if (result.rows.length === 0) {
      throw new Error("Categoria não encontrada");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Atualiza uma categoria pelo UUID.
 * @param {string} uuid - O UUID da categoria.
 * @param {string} description - A nova descrição da categoria.
 * @returns {Promise<{id: number, uuid: string, description: string, created_at: Date, updated_at: Date}>}
 */
async function update(uuid, description) {
  try {
    const result = await database.query({
      text: "UPDATE categories SET description = $1, updated_at = current_timestamp WHERE uuid = $2 RETURNING *",
      values: [description, uuid],
    });

    if (result.rows.length === 0) {
      throw new Error("Categoria não encontrada");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Deleta uma categoria pelo UUID.
 * @param {string} uuid - O UUID da categoria.
 * @returns {Promise<void>}
 */
async function del(uuid) {
  try {
    const result = await database.query({
      text: "DELETE FROM categories WHERE uuid = $1 RETURNING *",
      values: [uuid],
    });

    if (result.rows.length === 0) {
      throw new Error("Categoria não encontrada");
    }
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  findAll,
  findOneByUuid,
  update,
  delete: del,
};
