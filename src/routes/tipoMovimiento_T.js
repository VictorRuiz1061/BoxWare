import { Router } from "express";
import { mostrarTiposMovimiento, crearTipoMovimiento, buscarTipoMovimiento, actualizarTipoMovimiento, eliminarTipoMovimiento } from "../controllers/tipoMovimiento_T.js"; 
const router = Router();

router.get('/tipos-movimiento', mostrarTiposMovimiento);
router.get('/tipos-movimiento/buscar/:id_tipo_movimiento', buscarTipoMovimiento);
router.post('/tipos-movimiento/crear', crearTipoMovimiento);
router.put('/tipos-movimiento/actualizar/:id_tipo_movimiento', actualizarTipoMovimiento);
router.delete('/tipos-movimiento/eliminar/:id_tipo_movimiento', eliminarTipoMovimiento);

export default router; 