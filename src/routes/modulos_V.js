import { Router } from "express";
import { actualizarmodulo,  crearmodulo,  eliminarmodulo, mostrarmodulo } from "../controllers/modulo_V.js";

const router = Router();
router.get('/modulo', mostrarmodulo);   
router.post('/modulo', crearmodulo);
router.put('/modulo/:id_modulo', actualizarmodulo);  
router.delete('/modulo/:id_modulo', eliminarmodulo);  

export default router;
