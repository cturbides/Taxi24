exports.up = function(knex) {
  return knex.schema.createTable('Ubicacion', (table) => {
    table.increments('id').primary();
    table.decimal('latitud', 20, 15).notNullable();
    table.decimal('longitud', 20, 15).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Ubicacion');
};
