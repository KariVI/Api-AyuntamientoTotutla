const {db} = require('../firebase');

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
    const querySnapshot = await db.collection('categorias').get();
    const documentos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    res.status(200).json(documentos);
} catch (error) {
    res.status(500).json({ error: "Error al obtener los documentos" });
}
});

router.get("/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        const docRef = db.collection("categorias").doc(id); 
        const doc = await docRef.get(); 

        if (!doc.exists) {
            
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el documento", details: error.message });
    }
});

module.exports = router;