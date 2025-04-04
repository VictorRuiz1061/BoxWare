import { Router } from "express";
import { listarMunicipiosJp, registrarMunicipioJp, actualizarMunicipioJp, eliminarMunicipioJp, buscarMunicipioJp } from "../controllers/controllersMunicipios_Jp.js";

const router = Router()

router.get('/listarMunicipiosJp',  listarMunicipiosJp)
router.get('/registrarMunicipioJp',  registrarMunicipioJp)
router.post('/actualizarMunicipioJp', actualizarMunicipioJp)
router.put('/eliminarMunicipioJp/:id_municipio',  eliminarMunicipioJp)
router.get('/buscarMunicipioJp/:id_municipio',  buscarMunicipioJp)

export default router;