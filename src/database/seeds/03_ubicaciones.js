exports.seed = async function(knex) {
  await knex('Conductor').del();
  await knex('Ubicacion').del();
  await knex('Ubicacion').insert([
    {latitud: '18.481362477040786', longitud: '-69.9365612637347'},
    {latitud: '18.471892618870964', longitud: '-69.93837165983618'},
    {latitud: '18.46273390451001', longitud: '-69.94854259614624'},
    {latitud: '18.46285602386598', longitud: '-69.92356586630203'},
    {latitud: '18.455650830162938', longitud: '-69.95077419381502'},
    {latitud: '18.48905093522422', longitud: '-69.90611261652046'},
    {latitud: '18.50313228190709', longitud: '-69.90340134808984'},
    {latitud: '18.472093643769067', longitud: '-69.88688459583048'},
    {latitud: '18.4667265803993', longitud: '-69.92022396613179'},
    {latitud: '18.525175000685675', longitud: '-69.89804869689468'},
    {latitud: '18.512123733798294', longitud: '-69.95861012184567'},
    {latitud: '18.45280044394344', longitud: '-69.95922185341084'},
    {latitud: '18.43103859470983', longitud: '-69.96335104147568'},
    {latitud: '18.528510164663196', longitud: '-69.8530864268553'},
    {latitud: '18.52575503387685', longitud: '-69.94576375897728'},
  ]);
};
