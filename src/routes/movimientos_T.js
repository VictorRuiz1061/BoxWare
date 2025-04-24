import { Router } from "express";
import { mostrarMovimientos, crearMovimiento, actualizarMovimiento, eliminarMovimiento } from "../controllers/movimiento_T.js"; 
const router = Router();

router.get('/movimientos', mostrarMovimientos);
router.post('/movimientos', crearMovimiento);
router.put('/movimientos/:id_movimiento', actualizarMovimiento);
router.delete('/movimientos/:id_movimiento', eliminarMovimiento);

export default router;
