const express = require('express');
const morgan = require('morgan');

const errorHandler = require('./middlewares/errorHandler');
const invalidPathHandler = require('./middlewares/invalidPathHandler');

const pasajeroRouter = require('./routers/Pasajero');

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/pasajeros', pasajeroRouter);

app.use(errorHandler);
app.use(invalidPathHandler);

module.exports = app;
