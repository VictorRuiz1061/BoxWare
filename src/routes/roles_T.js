import { Router } from "express";
import { mostrarRoles, crearRol, buscarRol, actualizarRol, eliminarRol } from "../controllers/roles_T.js"; 
const router = Router();

router.get('/roles', mostrarRoles);
router.get('/roles/buscar/:id_rol', buscarRol);
router.post('/roles/crear', crearRol);
router.put('/roles/actualizar/:id_rol', actualizarRol);
router.delete('/roles/eliminar/:id_rol', eliminarRol);

export default router; 