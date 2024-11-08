import database from "infra/database";

/**
 * @param fields {username: string, email: string, type: "admin" | "user" | "master"}
 * @returns {Promise<{username: string, email: string, type: "admin" | "user" | "master"}> | {username: string, email: string, type: "admin" | "user" | "master"}}
 */
async function create({ username, email, type }) {
  try {
    const result = await database.query({
      text: "INSERT INTO users (username, email, type) VALUES ($1, $2, $3) RETURNING *",
      values: [username, email, type],
    });

    const user = result.rows[0];

    console.log(user);

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

async function findOnById() {}
async function findOnByEmail() {}
async function findOnByUsername() {}
// UPDATE
async function update() {}
// DELETE
async function del() {}

export default {
  create,
  findAll,
  findOnById,
  findOnByEmail,
  findOnByUsername,
  update,
  delete: del,
};
