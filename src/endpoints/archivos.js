const {db} = require('../firebase');

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
    const querySnapshot = await db.collection('archivos').get();
    const documentos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    res.status(200).json(documentos);
} catch (error) {
    res.status(500).json({ error: "Error al obtener los documentos" });
}
});

router.post("/", async (req, res) => {
    const data = req.body;
    try {
        const docRef = await db.collection("archivos").add(data);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el documento" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const docRef = db.collection("archivos").doc(id);
        await docRef.update(data);
        res.status(200).json({ message: "Archivo actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el documento" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const docRef = db.collection("archivos").doc(id);
        await docRef.delete();
        res.status(200).json({ message: "Documento eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el documento" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        const docRef = db.collection("archivos").doc(id); 
        const doc = await docRef.get(); 

        if (!doc.exists) {
            
            return res.status(404).json({ error: "Documento no encontrado" });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el documento", details: error.message });
    }
});

module.exports = router;