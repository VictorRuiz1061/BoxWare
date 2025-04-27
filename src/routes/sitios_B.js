import { Router } from "express";
import { mostrarSitios,crearSitio, buscarSitio, actualizarSitio, eliminarSitio } from "../controllers/sitio_B.js";
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/sitios', verificarToken, mostrarSitios);
router.get('/sitios/buscar/:id_sitio', verificarToken, buscarSitio);
router.post('/sitios/crear', verificarToken, crearSitio);
router.put('/sitios/actualizar/:id_sitio', verificarToken, actualizarSitio);
router.delete('/sitios/eliminar/:id_sitio', verificarToken, eliminarSitio);

export default router;