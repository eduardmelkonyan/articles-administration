/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("login").notNullable();
      table.string("password").notNullable();
      table.enum('role', ['admin', 'moderator', 'member']).notNullable();
      table.timestamps(true, true);
    })
    .createTable("category", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.timestamps(true, true);
    })
    .createTable("article", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("content").notNullable();
      table.integer("category_id").notNullable().references("id").inTable("category").onDelete('cascade');
      table.integer("user_id").notNullable().references("id").inTable("user").onDelete('cascade');
      table.binary("image").notNullable();
      table.timestamps(true, true);
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user")
    .dropTableIfExists("category")
    .dropTableIfExists("article");
};
