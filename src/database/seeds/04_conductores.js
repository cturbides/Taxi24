exports.seed = async function(knex) {
  await knex('Viaje').del();
  await knex('Conductor').del();
  await knex('Conductor').insert([
    {id_persona: 8, id_ubicacion: 1, estado: 'Disponible'},
    {id_persona: 9, id_ubicacion: 2, estado: 'Disponible'},
    {id_persona: 10, id_ubicacion: 3, estado: 'Disponible'},
    {id_persona: 11, id_ubicacion: 4, estado: 'Disponible'},
    {id_persona: 12, id_ubicacion: 5, estado: 'Disponible'},
    {id_persona: 13, id_ubicacion: 6, estado: 'Disponible'},
    {id_persona: 14, id_ubicacion: 7, estado: 'Disponible'},
  ]);
};
