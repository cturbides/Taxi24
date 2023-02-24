exports.up = function(knex) {
  return knex.schema.createTable('Viaje', (table) => {
    table.increments('id').primary();

    table.enu('estado', [
      'Pendiente', 'Aceptado', 'Cancelado', 'Finalizado',
    ]).notNullable();

    table.datetime('inicio').defaultTo(knex.fn.now());
    table.datetime('llegada').nullable();

    table.integer('id_pasajero').unsigned().notNullable()
        .references('id').inTable('Pasajero');

    table.integer('id_conductor').unsigned().notNullable()
        .references('id').inTable('Conductor');

    table.integer('id_ubicacion_llegada').unsigned().notNullable()
        .unique().references('id').inTable('Ubicacion');

    table.integer('id_ubicacion_salida').unsigned().notNullable()
        .unique().references('id').inTable('Ubicacion');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Viaje');
};
