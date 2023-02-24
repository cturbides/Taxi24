const db = require('../database');

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

function obtenerPorID(id) {
  const values = [
    'Viaje.id',
    'Viaje.id_pasajero',
    'Viaje.id_conductor',
    'Viaje.id_ubicacion_llegada',
    'Viaje.id_ubicacion_salida',
    'Viaje.estado',
    'Viaje.inicio',
    'Viaje.llegada',
  ];

  return db('Viaje')
      .select(values)
      .where({'Viaje.id': id})
      .first();
};

function obtenerTodosLosViajesActivos() {
  const values = [
    'Viaje.id',
    'Viaje.id_pasajero',
    'Viaje.id_conductor',
    'Viaje.id_ubicacion_llegada',
    'Viaje.id_ubicacion_salida',
    'Viaje.estado',
    'Viaje.inicio',
    'Viaje.llegada',
  ];

  return db('Viaje')
      .select(values)
      .whereIn('Viaje.estado', ['Aceptado', 'En Proceso', 'Pendiente'])
      .join('Conductor', {'Conductor.id': 'Viaje.id_conductor'})
      .join('Pasajero', {'Pasajero.id': 'Viaje.id_pasajero'});
};

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
