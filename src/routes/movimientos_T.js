import { Router } from "express";
import { mostrarMovimientos, crearMovimiento, actualizarMovimiento, eliminarMovimiento } from "../controllers/movimiento_T.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/movimientos', verificarToken, mostrarMovimientos);
router.post('/movimientos', verificarToken, crearMovimiento);
router.put('/movimientos/:id_movimiento', verificarToken, actualizarMovimiento);
router.delete('/movimientos/:id_movimiento', verificarToken, eliminarMovimiento);

export default router;
