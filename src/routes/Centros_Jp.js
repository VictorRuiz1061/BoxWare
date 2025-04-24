import { Router } from "express";
import { listarCentrosJp, registrarCentrosJp, actualizarCentrosJp, eliminarCentrosJp } from "../controllers/Centros_Jp.js";

const router = Router()

router.get('/centros',  listarCentrosJp)
router.post('/centros',  registrarCentrosJp)
router.put('/centros/:id_centro', actualizarCentrosJp)
router.delete('/centros/:id_centro',  eliminarCentrosJp) 

export default router;
