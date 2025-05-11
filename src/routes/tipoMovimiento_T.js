import { Router } from "express";
import { mostrarTiposMovimiento, crearTipoMovimiento, actualizarTipoMovimiento, eliminarTipoMovimiento } from "../controllers/tipoMovimiento_T.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/tipos-movimiento', verificarToken, mostrarTiposMovimiento);
router.post('/tipos-movimiento', verificarToken, crearTipoMovimiento);
router.put('/tipos-movimiento/:id_tipo_movimiento', verificarToken, actualizarTipoMovimiento);
router.delete('/tipos-movimiento/:id_tipo_movimiento', verificarToken, eliminarTipoMovimiento);

export default router; 