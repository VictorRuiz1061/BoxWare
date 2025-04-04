import { Router } from "express";
import { listarSedesJp, registrarSedeJp, actualizarSedeJp, eliminarSedeJp, buscarSedeJp } from "../controllers/controllerSedes_Jp.js";

const router = Router()

router.get('/listarSedesJp', listarSedesJp)
router.get('/registrarSedeJp', registrarSedeJp)
router.post('/actualizarSedeJp', actualizarSedeJp)
router.put('/eliminarSedeJp/:id_sede', eliminarSedeJp)
router.get('/buscarSedeJp/:id_sede', buscarSedeJp)

export default router;