import { Router } from "express";
import { mostrarTiposSitio, crearTipoSitio, actualizarTipoSitio, eliminarTipoSitio } from "../controllers/tipoSitio_T.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/tipos-sitio', verificarToken, mostrarTiposSitio);
router.post('/tipos-sitio', verificarToken, crearTipoSitio);
router.put('/tipos-sitio/:id_tipo_sitio', verificarToken, actualizarTipoSitio);
router.delete('/tipos-sitio/:id_tipo_sitio', verificarToken, eliminarTipoSitio);

export default router;