import { Router } from "express";
import { listarMunicipiosJp, registrarMunicipioJp, actualizarMunicipioJp, eliminarMunicipioJp } from "../controllers/Municipios_Jp.js";

const router = Router()

router.get('/municipios',  listarMunicipiosJp)
router.post('/municipios/crear',  registrarMunicipioJp)
router.put('/municipios/actualizar/:id_municipio', actualizarMunicipioJp)
router.delete('/municipios/eliminar/:id_municipio',  eliminarMunicipioJp) 

export default router;
