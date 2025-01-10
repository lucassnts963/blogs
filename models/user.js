import database from "infra/database";

/**
 * @param fields {username: string, email: string, type: "admin" | "user" | "master"}
 * @returns {Promise<{username: string, email: string, type: "admin" | "user" | "master"}> | {username: string, email: string, type: "admin" | "user" | "master"}}
 */
async function create({ username, email, type, password }) {
  try {
    const result = await database.query({
      text: "INSERT INTO users (username, email, type, password) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [username, email, type, password],
    });

    const user = result.rows[0];

    return user;
  } catch (error) {
    throw error;
  }
}
// READ
/**
 * @returns {Promise<{username: string, email: string, type: "admin" | "user" | "master"}[]> | {username: string, email: string, type: "admin" | "user" | "master"}[]}
 */
async function findAll() {
  try {
    const result = await database.query({
      text: "SELECT * FROM users",
    });

    const users = result.rows;

    return [...users];
  } catch (error) {
    throw error;
  }
}

async function findOneByEmail(email) {
  try {
    const result = await database.query({
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    });

    if (result.rows.length <= 0) {
      throw new Error("E-mail não existe");
    }
  } catch (error) {
    throw error;
  }
}

//TODO: Implementar o restante dos métodos
async function findOnById() {}
async function findOnByUsername() {}
// UPDATE
async function update() {}
// DELETE
async function del() {}

export default {
  create,
  findAll,
  findOnById,
  findOneByEmail,
  findOnByUsername,
  update,
  delete: del,
};
