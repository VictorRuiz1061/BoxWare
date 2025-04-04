import { Router } from "express";
import { actualizaradministrador, buscaradministrador,  crearadministrador,  eliminaradministrador, mostraradministrador } from "../controllers/admin_V.js";

const router = Router();
router.get('/administrador', mostraradministrador);
router.get('/administrador/:id_administrador', buscaradministrador);  
router.post('/administrador/crear', crearadministrador);
router.put('/administrador/actualizar/:id_administrador', actualizaradministrador);  
router.delete('/administrador/eliminar/:id_administrador', eliminaradministrador);  

export default router;
