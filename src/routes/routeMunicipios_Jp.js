import { Router, Router } from "express";
import { listarMunicipiosJp, registrarMunicipioJp, actualizarMunicipioJp, eliminarMunicipioJp, buscarMunicipioJp } from "../controllers/controllersMunicipios_Jp.js";
import { validarToken } from '../controller/seguridad.controller.js'

const router = Router()

router.get('/listarMunicipiosJp', validarToken,  listarMunicipiosJp)
router.get('/registrarMunicipioJp', validarToken,  registrarMunicipioJp)
router.post('/actualizarMunicipioJp', validarToken, actualizarMunicipioJp)
router.put('/eliminarMunicipioJp/:id_municipio', validarToken,  eliminarMunicipioJp)
router.get('/buscarMunicipioJp/:id_municipio', validarToken,  buscarMunicipioJp)

export default router;