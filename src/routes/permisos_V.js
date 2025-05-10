import { Router } from "express";
import { actualizarPermiso, crearPermiso, eliminarPermiso, mostrarPermisos } from "../controllers/permiso_V.js";

const router = Router();
router.get('/permisos', mostrarPermisos);
router.post('/permisos', crearPermiso);
router.put('/permisos/:id_permiso', actualizarPermiso);  
router.delete('/permisos/:id_permiso', eliminarPermiso);  

export default router;
