const Conductor = require('../models/Conductor');
const Ubicacion = require('../models/Ubicacion');
const Persona = require('../models/Persona');

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

async function obtenerConductores(_req, res, next) {
  try {
    const conductores = await Conductor.obtenerTodos();
    res.json(conductores);
  } catch (err) {
    next(err);
  }
};

async function obtenerConductoresDisponibles(_req, res, next) {
  try {
    const conductores = await Conductor.obtenerTodosLosDisponibles();
    res.json(conductores);
  } catch (err) {
    next(err);
  }
};

async function obtenerConductor(req, res, next) {
  const {id} = req.params;

  try {
    const conductor = await Conductor.obtenerPorID(id);
    res.json(conductor);
  } catch (err) {
    next(err);
  }
};

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
