const request = require('supertest');
const app = require('../src');
const db = require('../src/database');

describe('Pasajeros endpoints', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.migrate.rollback();
  });

  describe('POST /api/pasajeros', () => {
    it('Debería crear un nuevo pasajero', async () => {
      const response = await request(app)
          .post('/api/pasajeros')
          .send({
            nombre: 'Juan',
            email: 'juan@gmail.com',
            telefono: '1468874412',
          });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('Deberia crear otro nuevo pasajero', async () => {
      const res = await request(app)
          .post('/api/pasajeros')
          .send({
            nombre: 'Mario Perez',
            email: 'mario.perez@gmail.com',
            telefono: '18495161651',
          });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
    });

    it('Debería devolver el pasajero con el ID correspondiente', async () => {
      const response = await request(app).get('/api/pasajeros/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nombre).toBe('Juan');
    });
    
    it('Debería devolver un error 400 si falta algún campo', async () => {
      const response = await request(app)
          .post('/api/pasajeros')
          .send({
            nombre: 'Juan Perez',
            telefono: '555-1234',
          });

      let expectedMessage;
      expectedMessage = 'Error en la solicitud. Existe un valor nulo donde';
      expectedMessage += ' no se permiten valores nulos';

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(expectedMessage);
    });

    it('Debería devolver todos los pasajeros', async () => {
      const response = await request(app).get('/api/pasajeros');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });
});
