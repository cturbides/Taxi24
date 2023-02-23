const db = require('../database');

function crear(latitud, longitud) {
  return db('Ubicacion')
      .insert({latitud, longitud})
      .returning('id');
};

function actualizar(id, latitud, longitud) {
  return db('Ubicacion')
      .update({latitud, longitud})
      .where({id})
      .returning('id');
};

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
