import { Router } from "express";
import { actualizarPermisoUsers, buscarPermisoUsers, crearPermisoUsers, eliminarPermisoUsers, mostrarPermisosUsers } from "../controllers/permisoUser_V.js";  // Asegúrate de que la ruta sea correcta

const router = Router();
router.get('/permisosUsers', mostrarPermisosUsers);
router.get('/permisosUsers/:id_permiso_usuario', buscarPermisoUsers);  
router.post('/permisosUsers/crear', crearPermisoUsers);
router.put('/permisosUsers/actualizar/:id_permiso_usuario', actualizarPermisoUsers);  
router.delete('/permisosUsers/eliminar/:id_permiso_usuario', eliminarPermisoUsers);

export default router;
