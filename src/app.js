const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");

const {db} = require('./firebase');

const categorias = require('./endpoints/categorias');
const archivos = require('./endpoints/archivos');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/categorias', categorias);
app.use('/archivos', archivos);

// app.get ('/', async (req, res) => {
//   const querySnapshot = await db.collection('categorias').get();
//   const documentos = querySnapshot.docs.map((doc) => ({
//     id: doc.id,  // Incluye el ID del documento
//     ...doc.data(), // Incluye los datos del documento
// }));
// console.log(documentos);
//   //console.log(querySnapshot.docs[0].data());
// }
// );
module.exports = app;