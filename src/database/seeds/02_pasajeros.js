exports.seed = async function(knex) {
  await knex('Pasajero').del();
  await knex('Pasajero').insert([
    {id_persona: 1},
    {id_persona: 2},
    {id_persona: 3},
    {id_persona: 4},
    {id_persona: 5},
    {id_persona: 6},
    {id_persona: 7},
  ]);
};
