/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema
  .createTable('user_list', table => {
    table.uuid('user_list_id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('users_id').notNullable()
    table.uuid('movie_id').notNullable()
    table.uuid('series_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return await knex.schema.dropTable('user_list')
};
