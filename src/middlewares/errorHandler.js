/**
 * Middleware quer maneja los errores y excepciones
 * @param {Error} err - El error ocurrido
 * @param {Object} _req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} _next - Function next de Express
 */
function errorHandler(err, _req, res, _next) {
  console.error('Error: ', err.message);

  const status = err.status || 400;
  res.status(status).json({message: err.message});
};

module.exports = errorHandler;
