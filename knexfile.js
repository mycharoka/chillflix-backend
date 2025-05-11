// Update with your config settings.

const { seed } = require("./seeds/genre_seed");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config()
module.exports = {

  development: {
    client: process.env.DB_DIALECT || 'postgresql',
    connection: {
      database: process.env.DB_NAME || 'db_chillflix',
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      port: process.env.DB_PORT || 5432,
      host: process.env.DB_HOST || 'localhost'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds : {
      directory: './seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
