const express = require('express');
const morgan = require('morgan');

const errorHandler = require('./middlewares/errorHandler');
const invalidPathHandler = require('./middlewares/invalidPathHandler');

const pasajeroRouter = require('./routers/Pasajero');
const conductorRouter = require('./routers/Conductor');
const viajeRouter = require('./routers/Viaje');

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/pasajeros', pasajeroRouter);
app.use('/api/conductores', conductorRouter);
app.use('/api/viajes', viajeRouter);

app.use(errorHandler);
app.use(invalidPathHandler);

module.exports = app;
