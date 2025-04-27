import { Router } from "express";
import {mostrarFichas, crearFicha, actualizarFicha, eliminarFicha } from "../controllers/fichas_CV.js";
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/fichas', verificarToken, mostrarFichas);
router.post('/fichas', verificarToken, crearFicha);
router.put('/fichas/:id_ficha', verificarToken, actualizarFicha);
router.delete('/fichas/:id_ficha', verificarToken, eliminarFicha);

export default router;
