import { Router } from "express";
import { mostrarMateriales,crearMateriales, buscarMaterial, actualizarMaterial, eliminarMaterial, } from "../controllers/materiale_B.js";
import {validarToken} from '../controllers/seguridad.controller.js';

const router = Router();

router.get('/materiales', mostrarMateriales,validarToken);
router.get('/materiales/buscar/:id_material', buscarMaterial,validarToken);
router.post('/materiales/crear', crearMateriales,validarToken);
router.put('/materiales/actualizar/:id_material', actualizarMaterial,validarToken);
router.delete('/materiales/eliminar/:id_material', eliminarMaterial,validarToken);

export default router;