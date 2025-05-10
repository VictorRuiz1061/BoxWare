import { Router } from "express";
import { mostrarRoles, crearRol, actualizarRol, eliminarRol } from "../controllers/roles_V.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();    
router.get('/roles', verificarToken, mostrarRoles);
router.post('/roles', verificarToken, crearRol);
router.put('/roles/:id_rol', verificarToken, actualizarRol);
router.delete('/roles/:id_rol', verificarToken, eliminarRol);

export default router;
