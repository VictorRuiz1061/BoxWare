import { Router } from "express";
import { actualizarPermiso, crearPermiso, eliminarPermiso, mostrarPermisos } from "../controllers/permiso_V.js";
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();
router.get('/permisos', verificarToken, mostrarPermisos);
router.post('/permisos', verificarToken, crearPermiso);
router.put('/permisos/:id_permiso', verificarToken, actualizarPermiso);  
router.delete('/permisos/:id_permiso', verificarToken, eliminarPermiso);  

export default router;
