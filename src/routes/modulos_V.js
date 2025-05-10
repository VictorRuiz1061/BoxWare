import { Router } from "express";
import { actualizarModulo, crearModulo, eliminarModulo, mostrarModulos } from "../controllers/modulo_V.js";
import { verificarToken } from "../controllers/seguridad.controller.js";    

const router = Router();
router.get('/modulos', verificarToken, mostrarModulos);   
router.post('/modulos', verificarToken, crearModulo);
router.put('/modulos/:id_modulo', verificarToken, actualizarModulo);  
router.delete('/modulos/:id_modulo', verificarToken, eliminarModulo);  

export default router;
