import { Router } from "express";
import { mostrarTipoMaterial, crearTipoMaterial, buscarTipoMaterial, actualizarTipoMaterial, eliminarTipoMaterial } from "../controllers/tipoMaterial_B.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";const router = Router();

router.get('/tipo-materiales', mostrarTipoMaterial,verificarToken);
router.get('/tipo-materiales/:id_tipo_material', buscarTipoMaterial,verificarToken); 
router.post('/tipo-materiales', crearTipoMaterial,verificarToken);
router.put('/tipo-materiales/:id_tipo_material', actualizarTipoMaterial,verificarToken);
router.delete('/tipo-materiales/:id_tipo_material', eliminarTipoMaterial,verificarToken);

export default router;
