exports.seed = async function(knex) {
  await knex('Viaje').del();
  await knex('Viaje').insert([
    {
      id_pasajero: 1,
      id_conductor: 1,
      id_ubicacion_salida: 8,
      id_ubicacion_llegada: 9,
      estado: 'Pendiente',
    },
    {
      id_pasajero: 2,
      id_conductor: 3,
      id_ubicacion_salida: 10,
      id_ubicacion_llegada: 11,
      estado: 'Pendiente',
    },
    {
      id_pasajero: 3,
      id_conductor: 2,
      id_ubicacion_salida: 12,
      id_ubicacion_llegada: 13,
      estado: 'Pendiente',
    },
    {
      id_pasajero: 3,
      id_conductor: 2,
      id_ubicacion_salida: 14,
      id_ubicacion_llegada: 15,
      estado: 'Pendiente',
    },
  ]);
};
