
const path = require('path');
const PORT = process.env.PORT || 3000;

// Carga la variable de entorno o usa una ruta predeterminada

require('./firebase')

const app = require('./app');

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });