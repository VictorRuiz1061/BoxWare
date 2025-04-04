import { Router } from "express";
import { mostrarMateriales,crearMateriales, buscarMaterial, actualizarMaterial, eliminarMaterial, } from "../controllers/materiale_B.js";

const router = Router();

router.get('/materiales', mostrarMateriales);
router.get('/materiales/buscar/:id_material', buscarMaterial);
router.post('/materiales/crear', crearMateriales);
router.put('/materiales/actualizar/:id_material', actualizarMaterial);
router.delete('/materiales/eliminar/:id_material', eliminarMaterial);

export default router;