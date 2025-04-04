import { Router } from "express";
import { listarCentrosJp, registrarCentrosJp, actualizarCentrosJp, eliminarCentrosJp, buscarCentrosJp } from "../controllers/controllerCentros_Jp.js";

const router = Router()

router.get('/listarCentrosJp',  listarCentrosJp)
router.get('/registrarCentrosJp',  registrarCentrosJp)
router.post('/actualizarCentrosJp', actualizarCentrosJp)
router.put('/eliminarCentrosJp/:id_centro',  eliminarCentrosJp)
router.get('/buscarCentrosJp/:id_centro',  buscarCentrosJp)

export default router;
