import { EmailNotFound } from "error/EmailNotFound";
import database from "infra/database";

/**
 * @param fields {username: string, email: string, type: "admin" | "user" | "master"}
 * @returns {Promise<{uuid: string, username: string, email: string, type: "admin" | "user" | "master"}>}
 */
async function create({ username, email, type, password }) {
  try {
    const user = await database.prisma.user.create({
      data: { username, email, type, password },
      select: { username: true, email: true, type: true, uuid: true }, // Exclude password from response
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * @returns {Promise<{username: string, email: string, type: "admin" | "user" | "master"}[]>}
 */
async function findAll() {
  try {
    const users = await database.prisma.user.findMany({
      select: { username: true, email: true, type: true }, // Exclude password from response
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

/**
 * @param {string} email
 * @returns {Promise<{uuid: string, username: string, email: string, type: "admin" | "user" | "master", password: string}>}
 */
async function findOneByEmail(email) {
  try {
    const user = await database.prisma.user.findUnique({
      where: { email },
      select: {
        uuid: true,
        username: true,
        email: true,
        type: true,
        password: true,
      }, // Exclude password from response
    });

    if (!user) {
      throw new EmailNotFound();
    }

    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}

/**
 * @param {string} id
 * @returns {Promise<{uuid: string, username: string, email: string, type: "admin" | "user" | "master"}>}
 */
async function findOnById(id) {
  try {
    const user = await database.prisma.user.findUnique({
      where: { uuid: id },
      select: { uuid: true, username: true, email: true, type: true }, // Exclude password from response
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
}

/**
 * @param {string} username
 * @returns {Promise<{username: string, email: string, type: "admin" | "user" | "master"}>}
 */
async function findOnByUsername(username) {
  try {
    const user = await database.prisma.user.findUnique({
      where: { username },
      select: { username: true, email: true, type: true, password: true }, // Exclude password from response
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
}

/**
 * @param {string} id
 * @param {object} data
 * @returns {Promise<{username: string, email: string, type: "admin" | "user" | "master"}>}
 */
async function update(id, data) {
  try {
    const user = await database.prisma.user.update({
      where: { uuid: id },
      data,
      select: { username: true, email: true, type: true }, // Exclude password from response
    });

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

/**
 * @param {string} id
 * @returns {Promise<{uuid: string, username: string, email: string, type: "admin" | "user" | "master"}>}
 */
async function del(id) {
  try {
    const user = await database.prisma.user.delete({
      where: { uuid: id },
      select: { uuid: true, username: true, email: true, type: true }, // Exclude password from response
    });

    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export default {
  create,
  findAll,
  findOnById,
  findOneByEmail,
  findOnByUsername,
  update,
  delete: del,
};
