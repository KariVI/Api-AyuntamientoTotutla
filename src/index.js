
const path = require('path');

// Carga la variable de entorno o usa una ruta predeterminada

require('./firebase')

const app = require('./app');

app.listen(3000);
console.log('Servidor corriendo en http://localhost:3000');