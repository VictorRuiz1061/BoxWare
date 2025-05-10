import { Router } from "express";
import { mostrarRoles, crearRol, actualizarRol, eliminarRol } from "../controllers/roles_V.js"; 
const router = Router();

router.get('/roles', mostrarRoles);
router.post('/roles', crearRol);
router.put('/roles/:id_rol', actualizarRol);
router.delete('/roles/:id_rol', eliminarRol);

export default router; 