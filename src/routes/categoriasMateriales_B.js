import { Router } from "express";
import { actualizarcategorias_elementos, buscarcategorias_elementos, crearcategorias_elementos, eliminarcategorias_elementos, mostrarcategorias_elementos, } from "../controllers/categoriaMaterial_B.js";

const router = Router();

router.get('/categorias_elementos', mostrarcategorias_elementos);
router.get('/categorias_elementos/buscar/:id_categoria_elemento', buscarcategorias_elementos);  
router.post('/categorias_elementos/crear', crearcategorias_elementos);
router.put('/categorias_elementos/actualizar/:id_categoria_elemento', actualizarcategorias_elementos);
router.delete('/categorias_elementos/eliminar/:id_categoria_elemento', eliminarcategorias_elementos);

export default router;
