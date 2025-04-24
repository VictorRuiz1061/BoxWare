import { Router } from "express";
import { mostrarTiposMovimiento, crearTipoMovimiento, actualizarTipoMovimiento, eliminarTipoMovimiento } from "../controllers/tipoMovimiento_T.js"; 
const router = Router();

router.get('/tipos-movimiento', mostrarTiposMovimiento);
router.post('/tipos-movimiento', crearTipoMovimiento);
router.put('/tipos-movimiento/:id_tipo_movimiento', actualizarTipoMovimiento);
router.delete('/tipos-movimiento/:id_tipo_movimiento', eliminarTipoMovimiento);

export default router; 