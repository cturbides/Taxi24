const express = require('express');
const pasajeroController = require('../controllers/Pasajero');

const router = express.Router();

router.post('/', pasajeroController.crear);
router.get('/', pasajeroController.obtenerPasajeros);
router.get('/:id', pasajeroController.obtenerPasajeroPorID);

module.exports = router;