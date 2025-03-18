import { Router } from "express";
import { mostrarTiposSitio, crearTipoSitio, buscarTipoSitio, actualizarTipoSitio, eliminarTipoSitio } from "../controllers/tipoSitio_T.js"; 
const router = Router();

router.get('/tipos-sitio', mostrarTiposSitio);
router.get('/tipos-sitio/buscar/:id_tipo_sitio', buscarTipoSitio);
router.post('/tipos-sitio/crear', crearTipoSitio);
router.put('/tipos-sitio/actualizar/:id_tipo_sitio', actualizarTipoSitio);
router.delete('/tipos-sitio/eliminar/:id_tipo_sitio', eliminarTipoSitio);

export default router; 