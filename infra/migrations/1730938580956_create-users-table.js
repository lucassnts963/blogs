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
  pgm.createType("user_type", ["admin", "user", "master"]);

  pgm.createTable("users", {
    uuid: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    username: {
      type: "text",
      notNull: true,
      unique: true,
    },
    email: {
      type: "text",
      notNull: true,
      unique: true,
    },
    type: {
      type: "user_type",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
