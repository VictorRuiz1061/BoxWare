import { Router } from "express";
import { mostrarSitios,crearSitio, buscarSitio, actualizarSitio, eliminarSitio } from "../controllers/sitio_B.js"; 
import {validarToken} from '../controllers/seguridad.controller.js';
const router = Router();

router.get('/sitios', mostrarSitios,validarToken);
router.get('/sitios/buscar/:id_sitio', buscarSitio,validarToken);
router.post('/sitios/crear', crearSitio,validarToken);
router.put('/sitios/actualizar/:id_sitio', actualizarSitio,validarToken);
router.delete('/sitios/eliminar/:id_sitio', eliminarSitio,validarToken);

export default router;