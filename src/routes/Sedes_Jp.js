import { Router } from "express";
import { listarSedesJp, registrarSedeJp, actualizarSedeJp, eliminarSedeJp } from "../controllers/Sedes_Jp.js";
import { verificarToken } from "../controllers/seguridad.controller.js";


const router = Router()

router.get('/sedes', verificarToken, listarSedesJp)
router.post('/sedes', verificarToken, registrarSedeJp)
router.put('/sedes/:id_sede', verificarToken, actualizarSedeJp)
router.delete('/sedes/:id_sede', verificarToken, eliminarSedeJp)

export default router;
