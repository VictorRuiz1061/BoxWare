import { Router } from "express";
import { mostrarTipoMaterial, crearTipoMaterial, buscarTipoMaterial, actualizarTipoMaterial, eliminarTipoMaterial } from "../controllers/tipoMaterial_B.js"; 
import {validarToken} from '../controllers/seguridad.controller.js';
const router = Router();

router.get('/tipoMaterial', mostrarTipoMaterial,validarToken);
router.get('/tipoMaterial/:id_tipo_material', buscarTipoMaterial,validarToken); 
router.post('/tipoMaterial', crearTipoMaterial,validarToken);
router.put('/tipoMaterial/:id_tipo_material', actualizarTipoMaterial,validarToken);
router.delete('/tipoMaterial/:id_tipo_material', eliminarTipoMaterial,validarToken);

export default router;
