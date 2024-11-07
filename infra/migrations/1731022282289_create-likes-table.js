/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("likes", {
    uuid: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    userId: {
      type: "uuid",
      references: "users(uuid)",
      notNull: true,
    },
    postId: {
      type: "uuid",
      references: "posts(uuid)",
      notNull: true,
    },
    liked: {
      type: "boolean",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
