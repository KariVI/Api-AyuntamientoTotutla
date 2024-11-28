require('dotenv').config();

const { initializeApp , cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS no está configurado.');
  }
  
  // Parsear las credenciales desde la variable de entorno
  const firebaseConfig = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  
  initializeApp({
    credential: cert(firebaseConfig),
  });

const db = getFirestore();

module.exports = {
    db,
}