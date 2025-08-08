import { Router } from "express";
import { listarSedesJp, registrarSedeJp, actualizarSedeJp, eliminarSedeJp } from "../controllers/Sedes_Jp.js";
const router = Router()

router.get('/sedes', listarSedesJp)
router.post('/sedes', registrarSedeJp)
router.put('/sedes/:id_sede', actualizarSedeJp)
router.delete('/sedes/:id_sede', eliminarSedeJp)

export default router;
