import { Router, Router } from "express";
import { listarSedesJp, registrarSedeJp, actualizarSedeJp, eliminarSedeJp, buscarSedeJp } from "../controllers/controllerSedes_Jp.js";
import { validarToken } from '../controller/seguridad.controller.js'

const router = Router()

router.get('/listarSedesJp', validarToken,  listarSedesJp)
router.get('/registrarSedeJp', validarToken,  registrarSedeJp)
router.post('/actualizarSedeJp', validarToken, actualizarSedeJp)
router.put('/eliminarSedeJp/:id_sede', validarToken,  eliminarSedeJp)
router.get('/buscarSedeJp/:id_sede', validarToken,  buscarSedeJp)

export default router;