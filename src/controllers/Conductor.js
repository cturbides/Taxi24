const Conductor = require('../models/Conductor');
const Ubicacion = require('../models/Ubicacion');
const Persona = require('../models/Persona');

/**
 * Crea un conductor
 * @param {Object} req - Representa solicitud HTTP
 * @param {string} req.nombre - Nombre del conductor.
 * @param {string} req.email - Email del conductor.
 * @param {string} req.telefono - Telefono del conductor.
 * @param {string} req.latitud - Latitud de la ubicacion del conductor.
 * @param {string} req.longitud - Longitud de la ubicacion del conductor.
 * @param {Object} res - Representa respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function crear(req, res, next) {
  const {nombre, email, telefono, latitud, longitud} = req.body;

  try {
    const idPersona = await Persona.crear({nombre, email, telefono});
    const idUbicacion = await Ubicacion.crear(latitud, longitud);

    const idConductor = await Conductor.crear(
        idPersona[0].id, idUbicacion[0].id,
    );

    res.status(201).json({id: idConductor[0].id});
  } catch (err) {
    next(err);
  }
};

/**
 * Actualiza la ubicacion de un conductor
 * @param {Object} req - Representa una solicitud HTTP
 * @param {string} req.params.id - ID del conductor
 * @param {string} req.query.latitud - Nueva latitud para la ubicacion
 * @param {string} req.query.longitud - Nueva longitud para la ubicacion
 * @param {Object} res - Representa una respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function actualizarUbicacionDeConductor(req, res, next) {
  try {
    const {id} = req.params;
    const {latitud, longitud} = req.query;

    const ubicacionID = await Conductor.obtenerUbicacionID(id);

    const idUbicacionActualizada = await Ubicacion.actualizar(
        ubicacionID.id_ubicacion,
        latitud,
        longitud,
    );

    res.json({id, id_ubicacion: idUbicacionActualizada[0].id});
  } catch (err) {
    next(err);
  }
}

/**
 * Obtiene todos los conductores registrados
 * @param {Object} _req - Representa una solicitud HTTP
 * @param {Object} res - Representa una respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function obtenerConductores(_req, res, next) {
  try {
    const conductores = await Conductor.obtenerTodos();
    res.json(conductores);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene todos los conductores disponibles registrados
 * @param {Object} _req - Representa una solicitud HTTP
 * @param {Object} res - Representa una respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function obtenerConductoresDisponibles(_req, res, next) {
  try {
    const conductores = await Conductor.obtenerTodosLosDisponibles();
    res.json(conductores);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene un conductor mediante su ID
 * @param {Object} req - Representa una solicitud HTTP
 * @param {string} req.params.id - ID del conductor
 * @param {Object} res - Representa una respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function obtenerConductor(req, res, next) {
  const {id} = req.params;

  try {
    const conductor = await Conductor.obtenerPorID(id);
    res.json(conductor);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene los conductores disponibles cercanos a una latitud y longitud
 * @param {Object} req - Representa una solicitud HTTP
 * @param {string} req.query.latitud - Punto latitudinal de la ubicación
 * @param {string} req.query.longitud - Punto longitudinal de la ubicación
 * @param {Object} res - Representa una respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function obtenerConductoresDisponiblesCercanos(req, res, next) {
  const {latitud, longitud} = req.query;

  try {
    const conductores = await Conductor.obtenerTodosLosDisponiblesA3Km({
      latitud, longitud,
    });

    res.json(conductores);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  crear,
  obtenerConductor,
  obtenerConductores,
  obtenerConductoresDisponibles,
  obtenerConductoresDisponiblesCercanos,
  actualizarUbicacionDeConductor,
};
