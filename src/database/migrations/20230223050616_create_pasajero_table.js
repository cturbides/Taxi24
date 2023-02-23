exports.up = function(knex) {
  return knex.schema.createTable('Pasajero', (table) => {
    table.increments('id').primary();
    table.integer('id_persona').unsigned().notNullable().unique()
        .references('id').inTable('Persona');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Pasajero');
};
