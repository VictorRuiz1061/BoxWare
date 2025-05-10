import { Router } from "express";
import { actualizarcategorias_elementos, buscarcategorias_elementos, crearcategorias_elementos, eliminarcategorias_elementos, mostrarcategorias_elementos, } from "../controllers/categoriaMaterial_B.js";
import { verificarToken } from "../controllers/seguridad.controller.js";
const router = Router();

router.get('/categorias_elementos', verificarToken, mostrarcategorias_elementos);
router.get('/categorias_elementos/buscar/:id_categoria_elemento', verificarToken, buscarcategorias_elementos);  
router.post('/categorias_elementos/crear', verificarToken, crearcategorias_elementos);
router.put('/categorias_elementos/actualizar/:id_categoria_elemento', verificarToken, actualizarcategorias_elementos);
router.delete('/categorias_elementos/eliminar/:id_categoria_elemento', verificarToken, eliminarcategorias_elementos);

export default router;
