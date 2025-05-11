import { Router } from "express";
import { actualizarcategorias_elementos, buscarcategorias_elementos, crearcategorias_elementos, eliminarcategorias_elementos, mostrarcategorias_elementos, } from "../controllers/categoriaMaterial_B.js";
import { verificarToken } from "../controllers/seguridad.controller.js";
const router = Router();

router.get('/categoria-elementos', mostrarcategorias_elementos,verificarToken);
router.get('/categoria-elementos/:id_categoria_elemento', buscarcategorias_elementos,verificarToken);  
router.post('/categoria-elementos', crearcategorias_elementos,verificarToken);
router.put('/categoria-elementos/:id_categoria_elemento', actualizarcategorias_elementos,verificarToken);
router.delete('/categoria-elementos/:id_categoria_elemento', eliminarcategorias_elementos,verificarToken);

export default router;
