import { Router } from "express";
import { listarMunicipiosJp, registrarMunicipioJp, actualizarMunicipioJp, eliminarMunicipioJp } from "../controllers/Municipios_Jp.js";


const router = Router()

router.get('/municipios', listarMunicipiosJp)
router.post('/municipio', registrarMunicipioJp)
router.put('/municipios/:id_municipio', actualizarMunicipioJp)
router.delete('/municipios/:id_municipio', eliminarMunicipioJp) 

export default router;
