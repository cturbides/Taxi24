const Conductor = require('../models/Conductor');
const Ubicacion = require('../models/Ubicacion');
const Viaje = require('../models/Viaje');

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

async function verViaje(req, res, next) {
  try {
    const {id} = req.params;
    const viaje = await Viaje.obtenerPorID(id);

    res.json(viaje);
  } catch (err) {
    next(err);
  }
};

async function verViajesActivos(_req, res, next) {
  try {
    const viajesActivos = await Viaje.obtenerTodosLosViajesActivos();

    res.json(viajesActivos);
  } catch (err) {
    next(err);
  }
}

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

async function finalizarViaje(req, res, next) {
  try {
    const {id} = req.body;

    console.log('AJA1: ', id);

    const viaje = await Viaje.obtenerPorID(id);

    console.log('AJA2: ', viaje);

    const idViaje = await Viaje.actualizarEstado(
        id, 'Finalizado', new Date().toISOString(),
    );

    console.log('AJA: ', idViaje);

    await Conductor.actualizarEstado(viaje.id_conductor, 'Disponible');

    res.json({id: idViaje});
  } catch (err) {
    next(err);
  }
}

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
