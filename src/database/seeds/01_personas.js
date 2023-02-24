exports.seed = async function(knex) {
  await knex('Pasajero').del();
  await knex('Conductor').del();
  await knex('Persona').del();
  await knex('Persona').insert([
    {
      nombre: 'Juan Perez',
      email: 'juanperez@gmail.com',
      telefono: '555-1234',
    },

    {
      nombre: 'Ana Garcia',
      email: 'anagarcia@hotmail.com',
      telefono: '555-5678',
    },

    {
      nombre: 'Pedro Gomez',
      email: 'pedrogomez@yahoo.com',
      telefono: '555-9101',
    },

    {
      nombre: 'Maria Lopez',
      email: 'marialopez@gmail.com',
      telefono: '555-1212',
    },

    {
      nombre: 'Jorge Ramirez',
      email: 'jorgeramirez@hotmail.com',
      telefono: '555-3456',
    },

    {
      nombre: 'Sofia Fernandez',
      email: 'sofiafernandez@gmail.com',
      telefono: '555-7890',
    },

    {
      nombre: 'Ricardo Perez',
      email: 'ricardoperez@yahoo.com',
      telefono: '555-1011',
    },

    {
      nombre: 'Carla Torres',
      email: 'carlatorres@hotmail.com',
      telefono: '555-1314',
    },

    {
      nombre: 'Diego Rodriguez',
      email: 'diegorodriguez@gmail.com',
      telefono: '555-1516',
    },

    {
      nombre: 'Valeria Gomez',
      email: 'valeriagomez@yahoo.com',
      telefono: '555-1718',
    },

    {
      nombre: 'John Doe',
      email: 'johndoe@example.com',
      telefono: '5551234567',
    },

    {
      nombre: 'Jane Smith',
      email: 'janesmith@example.com',
      telefono: '5559876543',
    },

    {
      nombre: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      telefono: '5555551212',
    },

    {
      nombre: 'Sara Davis',
      email: 'saradavis@example.com',
      telefono: '1126548847148',
    },
  ]);
};
