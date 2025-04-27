import { Router } from "express";
import { actualizarUsuario, crearUsuario, eliminarUsuario, mostrarUsuarios } from "../controllers/usuario_V.js";
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();
router.get('/usuarios', verificarToken, mostrarUsuarios);
router.post('/usuarios', verificarToken, crearUsuario);
router.put('/usuarios/:id_usuario', verificarToken, actualizarUsuario);
router.delete('/usuarios/:id_usuario', verificarToken, eliminarUsuario);

export default router;
