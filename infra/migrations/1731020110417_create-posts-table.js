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
  pgm.createTable("posts", {
    uuid: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    blogId: {
      type: "uuid",
      references: "blogs(uuid)",
      onDelete: "CASCADE",
      notNull: true,
    },
    title: {
      type: "varchar(250)",
      notNull: true,
    },
    subtitle: {
      type: "varchar(250)",
    },
    slug: {
      type: "varchar(250)",
      notNull: true,
      unique: true,
    },
    content: {
      type: "text",
    },
    categoryId: {
      type: "uuid",
      notNull: true,
      references: "categories(uuid)",
    },
    postedAt: {
      type: "timestamp",
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("NOW()"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("NOW()"),
    },
  });

  pgm.createIndex("posts", "blogId");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
