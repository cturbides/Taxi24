/**
 * Middleware quer maneja los errores y excepciones
 * @param {Error} err - El error ocurrido
 * @param {Object} _req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} _next - Function next de Express
 */
function errorHandler(err, _req, res, _next) {
  console.error('Error status: ', err.status);
  console.error('Error code: ', err.code);
  console.error('Error message: ', err.message);

  let status = err.status || 400;
  let message = 'Error en la solicitud. ';

  switch (err.code) {
    case '22P02':
      message += 'Los datos proporcionados no tienen el formato adecuado';
      break;

    case '23502':
      message += 'Existe un valor nulo donde no se permiten valores nulos';
      break;

    case '23505':
      message += 'Un valor único en su consulta ya existe en la base de datos';
      status = 409;
      break;

    default:
      break;
  }

  res.status(status).json({message});
};

module.exports = errorHandler;
