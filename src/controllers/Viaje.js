const Conductor = require('../models/Conductor');
const Ubicacion = require('../models/Ubicacion');
const Viaje = require('../models/Viaje');

/**
 * Crea un Viaje
 * @param {Object} req - Representa una solicitud HTTP
 * @param {string} req.body.idPasajero - ID del pasajero que solicita el viaje
 * @param {string} req.body.latitudLlegada - Latitud de la ubicacion de llegada
 * @param {string} req.body.longitudLlegada - Longitud de ubicacion de llegada
 * @param {string} req.body.latitudSalida - Latitud de la ubicacion de salida
 * @param {string} req.body.longitudSalida - Longitud de la ubicacion de salida
 * @param {Object} res - Representa una respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function crear(req, res, next) {
  try {
    const {
      idPasajero,
      latitudLlegada,
      longitudLlegada,
      latitudSalida,
      longitudSalida,
    } = req.body;

    const conductoresCercanos = await Conductor.obtenerTodosLosDisponiblesA3Km({
      latitud: latitudSalida, longitud: longitudSalida,
    });

    if (!conductoresCercanos.length) {
      res.status(404).json({
        message: 'No hay conductores disponibles en este momento',
      });

      return;
    }

    const ubicacionLlegada = await Ubicacion.crear(
        latitudLlegada, longitudLlegada,
    );

    const ubicacionSalida = await Ubicacion.crear(
        latitudSalida, longitudSalida,
    );

    const idViaje = await Viaje.crear(
        idPasajero,
        conductoresCercanos.at(0).id,
        ubicacionSalida[0].id,
        ubicacionLlegada[0].id,
    );

    res.status(201).json({id: idViaje});
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene un Viaje mediante su ID
 * @param {Object} req - Representa una solicitud HTTP
 * @param {string} req.params.id - ID del Viaje
 * @param {Object} res - Representa una respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function verViaje(req, res, next) {
  try {
    const {id} = req.params;
    const viaje = await Viaje.obtenerPorID(id);

    res.json(viaje);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene todos los viajes que esten en Pendientes y Aceptados
 * @param {Object} _req - Representa una solicitud HTTP
 * @param {Object} res - Representa una respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function verViajesActivos(_req, res, next) {
  try {
    const viajesActivos = await Viaje.obtenerTodosLosViajesActivos();

    res.json(viajesActivos);
  } catch (err) {
    next(err);
  }
}

/**
 * Cancela un Viaje y coloca al Conductor como Disponible
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {string} req.body.id - ID del Viaje
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function cancelarViaje(req, res, next) {
  try {
    const {id} = req.body;

    const viaje = await Viaje.obtenerPorID(id);

    const idViaje = await Viaje.actualizarEstado(
        id, 'Cancelado', new Date().toISOString(),
    );

    await Conductor.actualizarEstado(viaje.id_conductor, 'Disponible');

    res.json({id: idViaje});
  } catch (err) {
    next(err);
  }
};

/**
 * Finaliza un Viaje y coloca al Conductor como Disponible
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {string} req.body.id - ID del Viaje
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function finalizarViaje(req, res, next) {
  try {
    const {id} = req.body;

    const viaje = await Viaje.obtenerPorID(id);

    const idViaje = await Viaje.actualizarEstado(
        id, 'Finalizado', new Date().toISOString(),
    );

    await Conductor.actualizarEstado(viaje.id_conductor, 'Disponible');

    res.json({id: idViaje});
  } catch (err) {
    next(err);
  }
}

/**
 * Acepta un Viaje y coloca al Conductor como No Disponible
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {string} req.body.id - ID del Viaje
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function aceptarViaje(req, res, next) {
  try {
    const {id} = req.body;

    const viaje = await Viaje.obtenerPorID(id);
    const idViaje = await Viaje.actualizarEstado(id, 'Aceptado');

    await Conductor.actualizarEstado(viaje.id_conductor, 'No Disponible');

    res.json({id: idViaje});
  } catch (err) {
    next(err);
  }
};


module.exports = {
  crear,
  verViaje,
  verViajesActivos,
  cancelarViaje,
  finalizarViaje,
  aceptarViaje,
};
