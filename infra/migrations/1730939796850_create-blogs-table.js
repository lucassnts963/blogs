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
  pgm.createTable("blogs", {
    uuid: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    userId: {
      type: "uuid",
      notNull: true,
      references: "users(uuid)",
      onDelete: "CASCADE",
    },
    name: {
      type: "varchar(250)",
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
