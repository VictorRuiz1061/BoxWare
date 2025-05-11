import { Router } from "express";
import { listarMunicipiosJp, registrarMunicipioJp, actualizarMunicipioJp, eliminarMunicipioJp } from "../controllers/Municipios_Jp.js";
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router()

router.get('/municipios',  verificarToken, listarMunicipiosJp)
router.post('/municipios',  verificarToken, registrarMunicipioJp)
router.put('/municipios/:id_municipio', verificarToken, actualizarMunicipioJp)
router.delete('/municipios/:id_municipio',  verificarToken, eliminarMunicipioJp) 

export default router;
