exports.up = function(knex) {
  return knex.schema.createTable('Persona', (table) => {
    table.increments('id').primary();
    table.string('nombre', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('telefono', 20).notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Persona');
};
