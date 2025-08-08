import { Router } from "express";
import {mostrarFichas, crearFicha, actualizarFicha, eliminarFicha } from "../controllers/fichas_CV.js";

const router = Router();

router.get('/fichas', mostrarFichas);
router.post('/fichas', crearFicha);
router.put('/fichas/:id_ficha', actualizarFicha);
router.delete('/fichas/:id_ficha', eliminarFicha);

export default router;
