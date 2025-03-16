import { Router } from "express";
import { mostrarTipoMaterial,crearTipoMaterial, buscarTipoMaterial, actualizarTipoMaterial, eliminarTipoMaterial } from "../controllers/tipoMaterial_B.js"; // Corrected file name

const router = Router();

router.get('/tipoMaterial', mostrarTipoMaterial);
router.get('/tipoMaterial/buscar/:id', buscarTipoMaterial);
router.post('/tipoMaterial/crear', crearTipoMaterial);
router.put('/tipoMaterial/actualizar/:id', actualizarTipoMaterial);
router.delete('/tipoMaterial/eliminar/:id', eliminarTipoMaterial);

export default router;