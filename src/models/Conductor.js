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

async function obtenerTodosLosDisponiblesA3Km({latitud, longitud}) {
  const haversine = require('../utils/DistanceBetweenTwoGeoPoints');

  const conductoresDisponibles = await obtenerTodosLosDisponibles();
  const distancias = [];
  const conductoresCercanos = [];

  conductoresDisponibles.forEach((conductor) => {
    const distancia = haversine(
        parseFloat(latitud),
        parseFloat(longitud),
        parseFloat(conductor.latitud),
        parseFloat(conductor.longitud),
    );

    console.log('DISTANCIA: ', distancia);

    if (distancia <= 3.0 && distancia >= 0) {
      conductoresCercanos.push(conductor);
      distancias.push(distancia);
    }
  });

  console.log('CONDUCTORES DB: ', conductoresDisponibles);
  console.log('CONDUCTORES: ', conductoresCercanos);

  const conductoresFinales = [];

  while (distancias.length && conductoresFinales.length < 3) {
    const maxDistancia = Math.max(distancias);
    console.log('MAX DISTANCIA: ', maxDistancia);
    const indexOfConductor = distancias.indexOf(maxDistancia);

    conductoresFinales.push(conductoresCercanos.at(indexOfConductor));

    conductoresCercanos.splice(indexOfConductor, 1);
    distancias.splice(indexOfConductor, 1);
  }

  return conductoresFinales;
};

function obtenerUbicacionID(id) {
  return db('Conductor')
      .select('id_ubicacion')
      .where({id})
      .first();
};

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
