import { Router } from "express";
import { actualizarUsuario, buscarUsuario, crearUsuario, eliminarUsuario, mostrarUsuarios } from "../controllers/ususario_V.js";

const router = Router();
router.get('/usuarios',mostrarUsuarios);
router.get('/usuarios/:id_usuario',buscarUsuario);
router.post('/usuarios/crear',crearUsuario);
router.put('/usuarios/actualizar/:id_usuario',actualizarUsuario);
router.delete('/usuarios/eliminar/:id_usuario',eliminarUsuario);

export default router;
