const express = require('express');
const morgan = require('morgan');

const errorHandler = require('./src/middlewares/errorHandler');
const invalidPathHandler = require('./src/middlewares/invalidPathHandler');

const pasajeroRouter = require('./src/routers/Pasajero');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/pasajeros', pasajeroRouter);

app.use(errorHandler);
app.use(invalidPathHandler);

app.listen(PORT, () => console.log('Listening on: ', PORT));
