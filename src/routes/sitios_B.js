import { Router } from "express";
import { mostrarSitios,crearSitio, buscarSitio, actualizarSitio, eliminarSitio } from "../controllers/sitio_B.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";
const router = Router();

router.get('/sitios', mostrarSitios,verificarToken);
router.get('/sitios/:id_sitio', buscarSitio,verificarToken);
router.post('/sitios', crearSitio,verificarToken);
router.put('/sitios/:id_sitio', actualizarSitio,verificarToken);
router.delete('/sitios/:id_sitio', eliminarSitio,verificarToken);

export default router;