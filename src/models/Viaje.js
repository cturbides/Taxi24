const db = require('../database');

/**
 * Crea un Viaje
 * @param {number} idPasajero - ID del pasajero
 * @param {number} idConductor - ID del conductor
 * @param {number} idUbicacionSalida - ID de la ubicacion de salida
 * @param {number} idUbicacionLlegada - ID de la ubicacion de llegada
 * @return {Promise<Object>} - Promesa -> Objeto con el ID del viaje
 */
function crear(idPasajero, idConductor, idUbicacionSalida, idUbicacionLlegada) {
  return db('Viaje')
      .insert({
        id_pasajero: idPasajero,
        id_conductor: idConductor,
        id_ubicacion_salida: idUbicacionSalida,
        id_ubicacion_llegada: idUbicacionLlegada,
        estado: 'Pendiente',
      })
      .returning('id');
};

/**
 * Obtiene un viaje por su ID
 * @param {number} id - ID del viaje
 * @return {Promise<Object>} - Promesa -> Objeto con los datos del viaje
 */
function obtenerPorID(id) {
  const values = [
    'id',
    'id_pasajero',
    'id_conductor',
    'id_ubicacion_llegada',
    'id_ubicacion_salida',
    'estado',
    'inicio',
    'llegada',
  ];

  return db('Viaje')
      .select(values)
      .where({id})
      .first();
};

/**
 * Obtiene todos los viajes activos
 * @return {Promise<Array>} - Promesa -> Objetos con los datos de los viajes
 */
function obtenerTodosLosViajesActivos() {
  const values = [
    'id',
    'id_pasajero',
    'id_conductor',
    'id_ubicacion_llegada',
    'id_ubicacion_salida',
    'estado',
    'inicio',
    'llegada',
  ];

  return db('Viaje')
      .select(values)
      .whereIn('estado', ['Aceptado', 'En Proceso', 'Pendiente']);
};

/**
 * Actualiza el estado de un viaje y (si no es nulo) la hora de llegada
 * @param {number} idViaje - ID del viaje
 * @param {string} estado - Nuevo estado del viaje
 * @param {Date | null} llegada - El datetime de la fecha de llegada
 * @returns {Promise<Object>} - Promesa -> Objeto con el ID del viaje
 */
function actualizarEstado(idViaje, estado, llegada = null) {
  return db('Viaje')
      .update({estado, llegada})
      .where({id: idViaje})
      .returning('id');
};

module.exports = {
  crear,
  obtenerPorID,
  actualizarEstado,
  obtenerTodosLosViajesActivos,
};
