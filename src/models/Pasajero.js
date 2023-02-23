const db = require('../database');

/**
 * Crea un nuevo Pasajero con el ID de la Persona dada
 * @param {number} idPersona - El ID de la persona asociada al Pasajero
 * @return {Promise<[number]>} - Una promesa -> ID del nuevo pasajero
 */
async function crear(idPersona) {
  return db('Pasajeros').insert({id_persona: idPersona}).returning('id');
};

/**
 * Obtiene todos los Pasajeros y los datos de cada persona
 * @return {Promise<object[]>} - Una promesa -> Objetos con datos de personas
 */
function obtenerTodos() {
  const selectValues = [
    'Pasajeros.id', 'Personas.nombre', 'Personas.email', 'Personas.telefono',
  ];

  return db('Pasajeros')
      .select(selectValues)
      .join('Personas', {'Personas.id': 'Pasajeros.id_persona'});
}

/**
 * Obtiene un Pasajero y datos de su persona a partir del ID del Pasajero
 * @param {number} id - El ID del Pasajero
 * @return {Promise<object | null>} - Una promesa -> Objeto con datos de persona
 */
function obtenerPorID(id) {
  const selectValues = [
    'Pasajeros.id', 'Personas.nombre', 'Personas.email', 'Personas.telefono',
  ];

  return db('Pasajeros')
      .select(selectValues)
      .where({'Pasajeros.id': id})
      .join('Personas', {'Personas.id': 'Pasajeros.id_persona'})
      .first();
};

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorID,
};
