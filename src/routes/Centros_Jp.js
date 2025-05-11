import { Router } from "express";
import { listarCentrosJp, registrarCentrosJp, actualizarCentrosJp, eliminarCentrosJp } from "../controllers/Centros_Jp.js";
import { verificarToken } from "../controllers/seguridad.controller.js";
const router = Router()

router.get('/centros',  verificarToken, listarCentrosJp)
router.post('/centros',  verificarToken, registrarCentrosJp)
router.put('/centros/:id_centro', verificarToken, actualizarCentrosJp)
router.delete('/centros/:id_centro',  verificarToken, eliminarCentrosJp) 

export default router;
