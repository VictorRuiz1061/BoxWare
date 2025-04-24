import { Router } from "express";
import { actualizarUsuario, crearUsuario, eliminarUsuario, mostrarUsuarios } from "../controllers/ususario_V.js";

const router = Router();
router.get('/usuarios',mostrarUsuarios);
router.post('/usuarios',crearUsuario);
router.put('/usuarios/:id_usuario',actualizarUsuario);
router.delete('/usuarios/:id_usuario',eliminarUsuario);

export default router;
