const haversine = require('../src/utils/DistanceBetweenTwoGeoPoints');

describe('Funcion que calcula distancia entre 2 puntos de la tierra', () => {
  test('La función devuelve un número', () => {
    expect(typeof haversine(52.5200, 13.4050, 51.5072, -0.1276)).toBe('number');
  });

  test('La función devuelve el valor correcto', () => {
    expect(haversine(52.5200, 13.4050, 51.5072, -0.1276)).toBeCloseTo(931.56);
  });

  test('La función devuelve -1 cuando recibe valores no numéricos', () => {
    expect(haversine('52.5200', 13.4050, '51.5072', '-0.1276')).toBe(-1);
  });

  test('La función devuelve -1 cuando no se proporcionan valores', () => {
    expect(haversine()).toBe(-1);
  });

  test('La función maneja valores con más de 2 decimales correctamente', () => {
    expect(haversine(52.5200, 13.4050, 51.5072, -0.1276)).toBeCloseTo(931.56);
  });

  test('La función maneja valores de longitud y latitud muy cercanos', () => {
    expect(haversine(52.5200, 13.4050, 52.5201, 13.4051)).toBe(0.01);
  });

  test('La función maneja los valores de longitud y latitud iguales', () => {
    expect(haversine(52.5200, 13.4050, 52.5200, 13.4050)).toBe(0.0);
  });
});
