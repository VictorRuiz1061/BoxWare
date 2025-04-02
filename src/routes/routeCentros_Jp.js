import { Router, Router } from "express";
import { listarCentrosJp, registrarCentrosJp, actualizarCentrosJp, eliminarCentrosJp, buscarCentrosJp } from "../controllers/controllerCentros_Jp";
import { validarToken } from '../controller/seguridad.controller.js'

const router = Router()

router.get('/listarCentrosJp', validarToken,  listarCentrosJp)
router.get('/registrarCentrosJp', validarToken,  registrarCentrosJp)
router.post('/actualizarCentrosJp', validarToken, actualizarCentrosJp)
router.put('/eliminarCentrosJp/:id_centro', validarToken,  eliminarCentrosJp)
router.get('/buscarCentrosJp/:id_centro', validarToken,  buscarCentrosJp)

export default router;