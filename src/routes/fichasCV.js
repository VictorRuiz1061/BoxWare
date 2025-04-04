import { Router } from "express";
import {mostrarFichas, buscarFicha, crearFicha, actualizarFicha, eliminarFicha } from "../controllers/fichas_CV.js";

const router = Router();

// Rutas para fichas
router.get('/fichas', mostrarFichas);
router.get('/fichas/:id_ficha', buscarFicha);
router.post('/fichas/crear', crearFicha);
router.put('/fichas/actualizar/:id_ficha', actualizarFicha);
router.delete('/fichas/eliminar/:id_ficha', eliminarFicha);

export default router;