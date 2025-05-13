import { Router } from "express";
import { mostrarMateriales,crearMateriales, buscarMaterial, actualizarMaterial, eliminarMaterial, cargarImagen, } from "../controllers/materiale_B.js";
import { verificarToken } from "../controllers/seguridad.controller.js";
const router = Router();

router.get('/materiales', mostrarMateriales,verificarToken);
router.get('/materiales/:id_material', buscarMaterial,verificarToken);
router.post('/materiales', cargarImagen, crearMateriales,verificarToken);
router.put('/materiales/:id_material', actualizarMaterial,verificarToken);
router.delete('/materiales/:id_material', eliminarMaterial,verificarToken);

export default router;