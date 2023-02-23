const db = require('../database');

/**
 * Crea una nueva persona
 * @async
 * @param {Object} personaData - Los datos de la persona a crear
 * @param {string} personaData.nombre - El nombre de la persona
 * @param {string} personaData.email - El email de la persona
 * @param {string} personaData.telefono - El numero telefonico de la persona
 * @return {Promise<[number]>}  - Una promesa -> ID de la persona creada
 * @throws {Error} - Si sucede un error en la consulta
 */
function crear({nombre, email, telefono}) {
  return db('Persona')
      .insert({nombre, email, telefono})
      .returning('id');
};

module.exports = {
  crear,
};
