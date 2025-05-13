import { Router } from "express";
import { mostrarTiposSitio, crearTipoSitio, actualizarTipoSitio, eliminarTipoSitio } from "../controllers/tipoSitio_T.js"; 
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/tipos-sitio', mostrarTiposSitio,verificarToken);
router.post('/tipos-sitio',  crearTipoSitio,verificarToken);
router.put('/tipos-sitio/:id_tipo_sitio',  actualizarTipoSitio,verificarToken);
router.delete('/tipos-sitio/:id_tipo_sitio',  eliminarTipoSitio,verificarToken);

export default router;