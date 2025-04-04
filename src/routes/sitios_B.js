import { Router } from "express";
import { mostrarSitios,crearSitio, buscarSitio, actualizarSitio, eliminarSitio } from "../controllers/sitio_B.js"; 
const router = Router();

router.get('/sitios', mostrarSitios);
router.get('/sitios/buscar/:id_sitio', buscarSitio);
router.post('/sitios/crear', crearSitio);
router.put('/sitios/actualizar/:id_sitio', actualizarSitio);
router.delete('/sitios/eliminar/:id_sitio', eliminarSitio);

export default router;