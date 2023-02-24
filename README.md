# Taxi24
## Descripción
Es un conjunto de APIs que permite gestionar una flota de pasajeros y conductores, creando y manejando viajes. Ahora mismo las APIs permiten:
- Obtener una lista de todos los conductores
- Obtener una lista de todos los conductores disponibles
- Obtener una lista de todos los conductores disponibles en un radio de 3km para una ubicación específica
- Obtener un conductor específico mediante su ID
- Obtener todos los pasajeros
- Obtener un pasajero específico por su ID
- Obtener una lista de los 3 conductores más cercanos al punto de partida
- Crear un Viaje asignando a un conductor
- Aceptar, Completar, Cancelar y finalizar un viaje
- Obtener una lista de los viajes activos

## Overview
Las APIs utilizan 5 modelos:
- Persona
- Pasajero
- Ubicación (o Punto geográfico)
- Conductor
- Viaje

Todas las tablas se dividen en: Modelo, controlador y Router para una mejor lectura.

## Endpoints
### Pasajero
- `POST /api/pasajeros`, crea un pasajero. Recibe como cuerpo: nombre, email y telefono.
- `GET /api/pasajeros`, devuelve un json con todos los pasajeros.
- `GET /api/pasajeros/:id`, recibe el id como parámetro. Devuelve un JSON.

### Conductor
- `POST /api/conductores`, crea un conductor. Recibe como cuerpo: nombre, email, telefono, latitud y longitud.
- `GET /api/conductores`, devuelve todos los conductores.
- `GET /api/conductores/disponibles`, devuelve todos los conductores disponibles.
- `GET /api/conductores/disponibles/cercanos`, devuelve todos los conductores cercanos. Recibe como query: latitud y longitud.
- `GET /api/conductores/:id`, devuelve un conductor. Recibe el id como parámetro.
- `PUT /api/conductores/:id/ubicacion`, actualiza la ubicación de un conductor.

### Viaje
- `POST /api/viajes/nuevo`, crea un viaje. Recibe como cuerpo: idPasajero, latitudLlegada, longitudLlegada, latitudSalida, longitudSalida.
- `POST /api/viajes/aceptar`, coloca el estado del viaje como Aceptado. Recibe como cuerpo: id.
- `POST /api/viajes/finalizar`, coloca el estado del viaje como Finalizado. Recibe como cuerpo: id.
- `POST /api/viajes/cancelar`, coloca el estado del viaje como Cancelado. Recibe como cuerpo: id.
- `GET /api/viajes/activos`, devuelve los viajes Pendientes y Aceptados.
- `GET /api/viajes/:id`, devuelve un viaje según su ID. Recibe el id como parámetro.

### Conductores cercanos
Para encontrar los conductores cercanos a un punto en específico se utiliza la fórmula del [Semiverseno](https://es.wikipedia.org/wiki/F%C3%B3rmula_del_semiverseno) (Haversine) que se encuentra como utilidad en src/utils/.
*Nota: En los seeds, todos los puntos se encuentran alrededor de un punto central (el [Parque Iberoamérica](https://goo.gl/maps/rpUEsdRmasfEcPBK7)), específicamente*:
- `latitud`: 18.4664349279385
- `longitud`: -69.91984024623967


## Instalación

### Requisitos previos
Para poder utilizar este proyecto, se debe tener instalado [Docker](https://docs.docker.com/get-started/) (o [Docker Desktop](https://www.docker.com/products/docker-desktop/)). Además, es necesario crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```sh
DB_PORT
DB_USER
DB_PASSWORD
PORT
```
Por ejemplo:
```sh
DB_PORT=20
DB_USER='userTesting'
DB_PASSWORD='change-this'
PORT=3000
```

### Instrucciones
Para poner en marcha el proyecto, se debe utilizar [Docker Compose](https://docs.docker.com/compose/install/) para subir los contenedores. Se puede utilizar:
```sh
docker compose up --build -d
```

Una vez que los contenedores están en funcionamiento, es necesario ejecutar las migraciones con:
```sh
docker exec taxi24-server-1 npm run migrate
```

Después, se pueden ejecutar las seeds *(ojo: algunas pruebas pueden dar un error debido a limitaciones técnicas)* utilizando:
```sh
docker exec taxi24-server-1 npm run seed
```

Finalmente, para probar los endpoints de la aplicación, es necesario abrir un navegador o una aplicación para peticiones HTTP y acceder a `localhost:PORT`.

### Detener los contenedores
Para detener los contenedores, se puede utilizar:

```sh
docker compose down --remove-orphans
```

## Valoraciones

### Puntos fuertes
- Sencilla instalación.
- Arquitectura robusta y escalable.
- Uso de middlewares como manejadores de errores y excepciones.
- Modularidad.
- Cursor de base de datos pseudo-nativo (Usando `pg` a través de `knex.js`).
- Dependencias minimalistas (pocas dependencias).

### Puntos débiles
- Falta de verificación y seguridad en algunos procedimientos.
- Falta de pruebas.
- Falta de aislamiento entre ambientes testing y producción para el contenedor de la base de datos.
- Falta de aislamiento entre ambientes testing y producción para las pruebas existentes.

## Licencia
[MIT](./LICENSE)

#### _Creado por Carlos S.T_