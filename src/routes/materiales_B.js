import { Router } from "express";
import { mostrarMateriales,crearMateriales, buscarMaterial, actualizarMaterial, eliminarMaterial, } from "../controllers/materiale_B.js";
import {validarToken} from '../controllers/seguridad.controller.js';

const router = Router();

router.get('/materiales', mostrarMateriales,validarToken);
router.get('/materiales/:id_material', buscarMaterial,validarToken);
router.post('/materiales', crearMateriales,validarToken);
router.put('/materiales/:id_material', actualizarMaterial,validarToken);
router.delete('/materiales/:id_material', eliminarMaterial,validarToken);

export default router;