exports.seed = async function(knex) {
  await knex('Persona').del();
  await knex('Persona').insert([
    {
      id: 1,
      nombre: 'Juan Perez',
      email: 'juanperez@gmail.com',
      telefono: '555-1234',
    },

    {
      id: 2,
      nombre: 'Ana Garcia',
      email: 'anagarcia@hotmail.com',
      telefono: '555-5678',
    },

    {
      id: 3,
      nombre: 'Pedro Gomez',
      email: 'pedrogomez@yahoo.com',
      telefono: '555-9101',
    },

    {
      id: 4,
      nombre: 'Maria Lopez',
      email: 'marialopez@gmail.com',
      telefono: '555-1212',
    },

    {
      id: 5,
      nombre: 'Jorge Ramirez',
      email: 'jorgeramirez@hotmail.com',
      telefono: '555-3456',
    },

    {
      id: 6,
      nombre: 'Sofia Fernandez',
      email: 'sofiafernandez@gmail.com',
      telefono: '555-7890',
    },

    {
      id: 7,
      nombre: 'Ricardo Perez',
      email: 'ricardoperez@yahoo.com',
      telefono: '555-1011',
    },

    {
      id: 8,
      nombre: 'Carla Torres',
      email: 'carlatorres@hotmail.com',
      telefono: '555-1314',
    },

    {
      id: 9,
      nombre: 'Diego Rodriguez',
      email: 'diegorodriguez@gmail.com',
      telefono: '555-1516',
    },

    {
      id: 10,
      nombre: 'Valeria Gomez',
      email: 'valeriagomez@yahoo.com',
      telefono: '555-1718',
    },
  ]);
};
