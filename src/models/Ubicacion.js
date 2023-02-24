const db = require('../database');

/**
 * Crea una nueva ubicacion en base a la longitud y latitud
 * @param {number} latitud - Latitud de la ubicacion
 * @param {number} longitud - Longitud de la ubicacion
 * @return {Promise<Object>} - Promesa -> Objeto con el ID de la ubicacion
 */
function crear(latitud, longitud) {
  return db('Ubicacion')
      .insert({latitud, longitud})
      .returning('id');
};

/**
 * Actualiza una ubicacion usando su ID
 * @param {number} id - ID de la ubicacion
 * @param {number} latitud - Nueva latitud
 * @param {number} longitud - Nueva longitud
 * @return {Promise<Object>} - Promesa -> Objeto con el ID de la ubicacion
 */
function actualizar(id, latitud, longitud) {
  return db('Ubicacion')
      .update({latitud, longitud})
      .where({id})
      .returning('id');
};

/**
 * Obtiene una ubicacion mediante su ID
 * @param {number} id - ID de la ubicacion
 * @return {Promise<Object>} - Promesa -> Objeto con los datos de la ubicacion
 */
function obtenerPorID(id) {
  return db('Ubicacion')
      .select('*')
      .where({id});
}

module.exports = {
  crear,
  actualizar,
  obtenerPorID,
};
