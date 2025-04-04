import { Router } from "express";
import { actualizarPermiso, buscarPermiso, crearPermiso, eliminarPermiso, mostrarPermisos } from "../controllers/permiso_V.js";

const router = Router();
router.get('/permisos', mostrarPermisos);
router.get('/permisos/:id_administrador', buscarPermiso);  
router.post('/permisos/crear', crearPermiso);
router.put('/permisos/actualizar/:id_administrador', actualizarPermiso);  
router.delete('/permisos/eliminar/:id_administrador', eliminarPermiso);  


export default router;