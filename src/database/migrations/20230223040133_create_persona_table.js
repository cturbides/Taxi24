exports.up = function(knex) {
  return knex.schema.createTable('Personas', (table) => {
    table.increments('id').primary();
    table.string('nombre', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('telefono', 11).notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Persona');
};
