import { Router } from "express";
import { mostrarMovimientos, crearMovimiento, buscarMovimiento, actualizarMovimiento, eliminarMovimiento } from "../controllers/movimiento_T.js"; 
const router = Router();

router.get('/movimientos', mostrarMovimientos);
router.get('/movimientos/buscar/:id_movimiento', buscarMovimiento);
router.post('/movimientos/crear', crearMovimiento);
router.put('/movimientos/actualizar/:id_movimiento', actualizarMovimiento);
router.delete('/movimientos/eliminar/:id_movimiento', eliminarMovimiento);

export default router; 