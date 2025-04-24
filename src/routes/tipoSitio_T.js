import { Router } from "express";
import { mostrarTiposSitio, crearTipoSitio, actualizarTipoSitio, eliminarTipoSitio } from "../controllers/tipoSitio_T.js"; 
const router = Router();

router.get('/tipos-sitio', mostrarTiposSitio);
router.post('/tipos-sitio', crearTipoSitio);
router.put('/tipos-sitio/:id_tipo_sitio', actualizarTipoSitio);
router.delete('/tipos-sitio/:id_tipo_sitio', eliminarTipoSitio);

export default router;