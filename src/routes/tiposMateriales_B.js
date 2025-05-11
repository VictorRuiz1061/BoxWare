import { Router } from "express";
import { mostrarTipoMaterial, crearTipoMaterial, buscarTipoMaterial, actualizarTipoMaterial, eliminarTipoMaterial } from "../controllers/tipoMaterial_B.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";const router = Router();

router.get('/tipoMaterial', mostrarTipoMaterial,verificarToken);
router.get('/tipoMaterial/:id_tipo_material', buscarTipoMaterial,verificarToken); 
router.post('/tipoMaterial', crearTipoMaterial,verificarToken);
router.put('/tipoMaterial/:id_tipo_material', actualizarTipoMaterial,verificarToken);
router.delete('/tipoMaterial/:id_tipo_material', eliminarTipoMaterial,verificarToken);

export default router;
