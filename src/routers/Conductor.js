const express = require('express');
const conductorController = require('../controllers/Conductor');

const router = new express.Router();

router.post('/', conductorController.crear);

router.get('/', conductorController.obtenerConductores);

router.get(
    '/disponibles/cercanos',
    conductorController.obtenerConductoresDisponiblesCercanos,
);

router.get('/disponibles', conductorController.obtenerConductoresDisponibles);

router.get('/:id', conductorController.obtenerConductor);

router.put(
    '/:id/ubicacion',
    conductorController.actualizarUbicacionDeConductor,
);

module.exports = router;
