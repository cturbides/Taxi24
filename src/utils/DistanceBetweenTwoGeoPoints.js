/**
 * Converts any degree value to Radian
 * @param {number} degrees - A value in degrees
 * @return {number} - Degrees value converted to Radian
 */
function convertDegreesToRadian(degrees) {
  return (degrees / 180) * Math.PI;
}

/**
 * Calcula la distancia entre dos puntos geográficos
 * @param {number} lat1 - La latitud de la primera ubicación
 * @param {number} long1 - La longitud de la primera ubicación
 * @param {number} lat2 - La latitud de la segunda ubicación
 * @param {number} long2 - La longitud de la segunda ubicación
 * @return {number} - La distancia entre los dos puntos en Km
 */
function haversine(lat1=0, long1=0, lat2=0, long2=0) {
  if (
    typeof(lat1) != 'number' || !lat1 ||
    typeof(lat2) != 'number' || !lat2 ||
    typeof(long1) != 'number' || !long1 ||
    typeof(long2) != 'number' || !long2
  ) {
    return 0;
  }

  const latitude1 = convertDegreesToRadian(lat1);
  const latitude2 = convertDegreesToRadian(lat2);
  const longitude1 = convertDegreesToRadian(long1);
  const longitude2 = convertDegreesToRadian(long2);

  const earthRadiusInKm = 6371.0088;

  const differenceInLatitude = latitude2 - latitude1;
  const differenceInLongitude = longitude2 - longitude1;

  /**
       * a = sin2(differenceInLatitud/2)
       * b = sin2(differenceInLongitude/2)
       * c = cos(latitude1)
       * d = cos(latitude2)
       *
       * Formula: distance = 2r arcsin(sqrt(a + b*c*d))
       * Where r = earthRadiusInKm
       */

  const sqrtResult = Math.sqrt(
      Math.sin(differenceInLatitude / 2) *
      Math.sin(differenceInLatitude / 2) +
      Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(differenceInLongitude / 2) *
      Math.sin(differenceInLongitude / 2),
  );

  const distance = 2 * earthRadiusInKm * Math.asin(sqrtResult);
  return parseFloat(distance.toFixed(2));
};

module.exports = haversine;
