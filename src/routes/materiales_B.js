import { Router } from "express";
import { mostrarMateriales,crearMateriales, buscarMaterial, actualizarMaterial, eliminarMaterial, } from "../controllers/materiale_B.js";
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/materiales', verificarToken, mostrarMateriales);
router.get('/materiales/buscar/:id_material', verificarToken, buscarMaterial);
router.post('/materiales/crear', verificarToken, crearMateriales);
router.put('/materiales/actualizar/:id_material', verificarToken, actualizarMaterial);
router.delete('/materiales/eliminar/:id_material', verificarToken, eliminarMaterial);

export default router;