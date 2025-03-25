import { Router } from "express";
import { actualizartipoPermiso, buscartipoPermiso,  creartipoPermiso, eliminartipoPermiso, mostrartiposPermisos, } from "../controllers/tipo_permiso_V.js";

const router = Router();
router.get('/tipoPermiso',mostrartiposPermisos);
router.get('/tipoPermiso/:id_tipo_permiso',buscartipoPermiso);
router.post('/tipoPermiso/crear',creartipoPermiso);
router.put('/tipoPermiso/actualizar/:id_tipo_permiso',actualizartipoPermiso);
router.delete('/tipoPermiso/eliminar/:id_tipo_permiso',eliminartipoPermiso);

export default router;