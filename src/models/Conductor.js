const db = require('../database');

/**
 * Crea un nuevo Conductor con el ID de la Persona dada
 * @param {number} idPersona - El ID de la persona asociada al Conductor
 * @param {number} idUbicacion - El ID de la ubicacion asociada al conductor
 * @return {Promise<[number]>} - Una promesa -> ID del nuevo Conductor
 */
async function crear(idPersona, idUbicacion) {
  return db('Conductor')
      .insert({
        id_persona: idPersona,
        id_ubicacion: idUbicacion,
        estado: 'Disponible',
      })
      .returning('id');
};

/**
 * Obtiene todos los Conductores y los datos de cada persona
 * @return {Promise<object[]>} - Una promesa -> Objetos con datos de personas
 */
function obtenerTodos() {
  const values = [
    'Conductor.id',
    'Persona.nombre',
    'Persona.email',
    'Persona.telefono',
    'Conductor.estado',
    'Ubicacion.latitud',
    'Ubicacion.longitud',
  ];

  return db('Conductor')
      .select(values)
      .join('Persona', {'Persona.id': 'Conductor.id_persona'})
      .join('Ubicacion', {'Ubicacion.id': 'Conductor.id_ubicacion'});
}

/**
 * Obtiene un Conductor y datos de su persona a partir del ID del Conductor
 * @param {number} id - El ID del Conductor
 * @return {Promise<object | null>} - Una promesa -> Objeto con datos de persona
 */
function obtenerPorID(id) {
  const values = [
    'Conductor.id',
    'Persona.nombre',
    'Persona.email',
    'Persona.telefono',
    'Conductor.estado',
    'Ubicacion.latitud',
    'Ubicacion.longitud',
  ];

  return db('Conductor')
      .select(values)
      .where({'Conductor.id': id})
      .join('Persona', {'Persona.id': 'Conductor.id_persona'})
      .join('Ubicacion', {'Ubicacion.id': 'Conductor.id_ubicacion'})
      .first();
};

/**
 * Obtiene todos los conductores disponibles
 * @return {Promise<Array>} - Una promesa -> Objetos con datos de personas
 */
function obtenerTodosLosDisponibles() {
  const values = [
    'Conductor.id',
    'Persona.nombre',
    'Persona.email',
    'Persona.telefono',
    'Conductor.estado',
    'Ubicacion.latitud',
    'Ubicacion.longitud',
  ];

  return db('Conductor')
      .select(values)
      .where({'Conductor.estado': 'Disponible'})
      .join('Persona', {'Persona.id': 'Conductor.id_persona'})
      .join('Ubicacion', {'Ubicacion.id': 'Conductor.id_ubicacion'});
};

/**
 * Obtiene los conductores disponibles mas cercanos a un punto dado
 * @param {Object} ubicacion - Objeto que contiene la latitud y longitud
 * @return {Array} - Contiene objetos con los datos de los conductores
 */
async function obtenerTodosLosDisponiblesA3Km({latitud, longitud}) {
  const haversine = require('../utils/DistanceBetweenTwoGeoPoints');
  const MAX_CONDUCTORES = 3;

  const conductoresDisponibles = await obtenerTodosLosDisponibles();
  const conductoresCercanos = [];

  conductoresDisponibles.forEach((conductor) => {
    const distancia = haversine(
        parseFloat(latitud),
        parseFloat(longitud),
        parseFloat(conductor.latitud),
        parseFloat(conductor.longitud),
    );

    if (distancia <= 3.0 && distancia >= 0) {
      conductoresCercanos.push({conductor, distancia});
    }
  });

  // orden ascendente (a < b ? a : b)
  conductoresCercanos.sort((a, b) => a.distancia - b.distancia);

  return conductoresCercanos
      .slice(0, MAX_CONDUCTORES)
      .map((objConductor) => objConductor.conductor);
};

/**
 * Devuelve el ID de la ubicacion de un conductor
 * @param {number} id - El ID del conductor
 * @return {Promise<object>} - Promesa -> Objeto con el ID de la ubicacion
 */
function obtenerUbicacionID(id) {
  return db('Conductor')
      .select('id_ubicacion')
      .where({id})
      .first();
};

/**
 * Actualiza el estado del conductor
 * @param {number} id - ID del conductor
 * @param {string} estado - Nuevo estado del conductor
 * @return {Promise<object>} - Contiene el ID del conductor
 */
function actualizarEstado(id, estado) {
  return db('Conductor')
      .update({estado})
      .where({id})
      .returning('id');
}

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorID,
  obtenerTodosLosDisponibles,
  obtenerTodosLosDisponiblesA3Km,
  obtenerUbicacionID,
  actualizarEstado,
};
