const knex = require('knex');
const knexConfig = require('../src/database/config');

module.exports = async () => {
  const db = knex(knexConfig.test);

  await db.migrate.latest({directory: './src/database/migrations'});
  await db.seed.run({directory: './src/database/seeds'});

  global.__DB__ = db;
};
