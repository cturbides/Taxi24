const Pasajero = require('../models/Pasajero');
const Persona = require('../models/Persona');

/**
 * Crea un nuevo pasajero y devuelve el ID
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
async function crear(req, res) {
  const {nombre, email, telefono} = req.body;

  const idPersona = await Persona.crear({nombre, email, telefono});
  const idPasajero = await Pasajero.crear(idPersona[0].id);

  res.status(201).json({id: idPasajero[0].id});
};

/**
 * Devuelve una lista con todos los pasajeros existentes
 * @param {Object} _req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
async function obtenerPasajeros(_req, res) {
  const pasajeros = await Pasajero.obtenerTodos();

  res.json(pasajeros);
}

/**
 * Devuelve un pasajero por su ID
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
async function obtenerPasajeroPorID(req, res) {
  const {id} = req.params;

  const pasajero = await Pasajero.obtenerPorID(id);

  res.json(pasajero);
};

module.exports = {
  crear,
  obtenerPasajeros,
  obtenerPasajeroPorID,
};
