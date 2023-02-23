const request = require('supertest');
const app = require('../src');
const db = require('../src/database');

describe('Conductores endpoints', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.migrate.rollback();
  });

  describe('POST /api/conductores', () => {
    it('Debería crear un nuevo conductor', async () => {
      const response = await request(app)
          .post('/api/conductores')
          .send({
            nombre: 'Juan',
            email: 'juan@gmail.com',
            telefono: '1468874412',
            latitud: '18.556204012439245',
            longitud: '-69.87082664113095',
          });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('Deberia crear otro nuevo conductor', async () => {
      const res = await request(app)
          .post('/api/conductores')
          .send({
            nombre: 'Mario Perez',
            email: 'mario.perez@gmail.com',
            telefono: '18495161651',
            latitud: '18.498491348393806',
            longitud: '-69.88611993025998',
          });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
    });

    it('Debería devolver al conductor con el ID correspondiente', async () => {
      const response = await request(app).get('/api/conductores/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nombre).toBe('Juan');
    });

    it('Debería devolver un error 400 si falta algún campo', async () => {
      const response = await request(app)
          .post('/api/conductores')
          .send({
            nombre: 'Juanito',
            telefono: '334-1234',
          });

      let expectedMessage;
      expectedMessage = 'Error en la solicitud. Existe un valor nulo donde';
      expectedMessage += ' no se permiten valores nulos';

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(expectedMessage);
    });

    it('Debería volver a devolver un error 400 si falta algún campo', async () => {
      const response = await request(app)
          .post('/api/conductores')
          .send({
            nombre: 'Juanito',
            email: 'aja@gmail.com',
            telefono: '534-1234',
            latitud: '18.507047972869195'
          });

      let expectedMessage;
      expectedMessage = 'Error en la solicitud. Existe un valor nulo donde';
      expectedMessage += ' no se permiten valores nulos';

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(expectedMessage);
    });

    it('Debería devolver todos los conductores', async () => {
      const response = await request(app).get('/api/conductores');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });
});
