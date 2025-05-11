/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema
  .createTable('users', table => {
    table.uuid('users_id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
    table.string('name').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.timestamp('deleted_at').defaultTo(knex.fn.now())
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return await knex.schema.dropTable('users')
};
