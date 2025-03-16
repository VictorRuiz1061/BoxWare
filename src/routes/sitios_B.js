import { Router } from "express";
import { mostrarSitios,crearSitio, buscarSitio, actualizarSitio, eliminarSitio } from "../controllers/sitio_B.js"; // Corrected file name

const router = Router();

router.get('/sitios', mostrarSitios);
router.get('/sitios/buscar/:id', buscarSitio);
router.post('/sitios/crear', crearSitio);
router.put('/sitios/actualizar/:id', actualizarSitio);
router.delete('/sitios/eliminar/:id', eliminarSitio);

export default router;