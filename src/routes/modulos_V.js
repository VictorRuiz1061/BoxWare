import { Router } from "express";
import { actualizarmodulo,  crearmodulo,  eliminarmodulo, mostrarmodulo } from "../controllers/modulo_V.js";
import { verificarToken } from "../controllers/seguridad.controller.js";    

const router = Router();
router.get('/modulo', verificarToken, mostrarmodulo);   
router.post('/modulo', verificarToken, crearmodulo);
router.put('/modulo/:id_modulo', verificarToken, actualizarmodulo);  
router.delete('/modulo/:id_modulo', verificarToken, eliminarmodulo);  

export default router;
