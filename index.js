const express = require('express');
const morgan = require('morgan');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.listen(PORT, () => console.log('Listening on: ', PORT));
