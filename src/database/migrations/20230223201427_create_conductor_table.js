exports.up = function(knex) {
  return knex.schema.createTable('Conductor', (table) => {
    table.increments('id').primary();
    table.enu('estado', ['Disponible', 'No Disponible']).notNullable();

    table.integer('id_persona').unsigned().notNullable().unique()
        .references('id').inTable('Persona');

    table.integer('id_ubicacion').unsigned().notNullable().unique()
        .references('id').inTable('Ubicacion');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Conductor');
};
