const Pasajero = require('../models/Pasajero');
const Persona = require('../models/Persona');

/**
 * Crea un nuevo pasajero y devuelve el ID
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {string} req.body.nombre - Nombre de la persona
 * @param {string} req.body.email - Email de la persona
 * @param {string} req.body.telefono - Teléfono de la persona
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function crear(req, res, next) {
  const {nombre, email, telefono} = req.body;

  try {
    const idPersona = await Persona.crear({nombre, email, telefono});
    const idPasajero = await Pasajero.crear(idPersona[0].id);

    res.status(201).json({id: idPasajero[0].id});
  } catch (err) {
    next(err);
  }
}

/**
 * Devuelve una lista con todos los pasajeros existentes
 * @param {Object} _req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - función next de Express
 */
async function obtenerPasajeros(_req, res, next) {
  try {
    const pasajeros = await Pasajero.obtenerTodos();
    res.json(pasajeros);
  } catch (err) {
    next(err);
  }
}

/**
 * Devuelve un pasajero por su ID
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {string} req.params.id - ID del pasajero
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función next de Express
 */
async function obtenerPasajeroPorID(req, res, next) {
  const {id} = req.params;

  try {
    const pasajero = await Pasajero.obtenerPorID(id);
    res.json(pasajero);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  crear,
  obtenerPasajeros,
  obtenerPasajeroPorID,
};
