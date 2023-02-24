/**
 * Middleware que maneja solicitudes a rutas no válidas
 * @param {Object} _req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} _next - Function next de Express
 */
function invalidPathHandler(_req, res, _next) {
  res.status(404).json({message: 'Invalid path'});
}

module.exports = invalidPathHandler;
