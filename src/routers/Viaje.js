const express = require('express');
const viajeController = require('../controllers/Viaje');

const router = new express.Router();

router.post('/nuevo', viajeController.crear);
router.post('/aceptar', viajeController.aceptarViaje);
router.post('/finalizar', viajeController.finalizarViaje);
router.post('/cancelar', viajeController.cancelarViaje);
router.get('/activos', viajeController.verViajesActivos);
router.get('/:id', viajeController.verViaje);

module.exports = router;
