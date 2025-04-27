import { Router } from "express";
import { mostrarTipoMaterial, crearTipoMaterial, buscarTipoMaterial, actualizarTipoMaterial, eliminarTipoMaterial } from "../controllers/tipoMaterial_B.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/tipoMaterial', mostrarTipoMaterial);
router.get('/tipoMaterial/buscar/:id_tipo_material', buscarTipoMaterial); 
router.post('/tipoMaterial/crear', crearTipoMaterial);
router.put('/tipoMaterial/actualizar/:id_tipo_material', verificarToken, actualizarTipoMaterial);
router.delete('/tipoMaterial/eliminar/:id_tipo_material', verificarToken, eliminarTipoMaterial);

export default router;
