exports.up = function(knex) {
  return knex.schema.createTable('Pasajeros', (table) => {
    table.increments('id').primary();
    table.integer('id_persona').unsigned().notNullable().unique()
        .references('id').inTable('Personas');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Pasajeros');
};
