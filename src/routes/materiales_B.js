import { Router } from "express";
import { mostrarMateriales,crearMateriales, buscarMaterial, actualizarMaterial, eliminarMaterial, } from "../controllers/materiale_B.js";

const router = Router();

router.get('/materiales', mostrarMateriales);
router.get('/materiales/buscar/:id', buscarMaterial);
router.post('/materiales/crear', crearMateriales);
router.put('/materiales/actualizar/:id', actualizarMaterial);
router.delete('/materiales/eliminar/:id', eliminarMaterial);

export default router;