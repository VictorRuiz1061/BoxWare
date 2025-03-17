import { Router } from "express";
import { actualizarcategorias_elementos, buscarcategorias_elementos, crearcategorias_elementos, eliminarcategorias_elementos, mostrarcategorias_elementos, } from "../controllers/categoriaMaterial_B.js";
import {validarToken} from '../controllers/seguridad.controller.js';

const router = Router();

router.get('/categorias_elementos', mostrarcategorias_elementos,validarToken);
router.get('/categorias_elementos/buscar/:id_categoria_elemento', buscarcategorias_elementos,validarToken);  
router.post('/categorias_elementos/crear', crearcategorias_elementos,validarToken);
router.put('/categorias_elementos/actualizar/:id_categoria_elemento', actualizarcategorias_elementos,validarToken);
router.delete('/categorias_elementos/eliminar/:id_categoria_elemento', eliminarcategorias_elementos,validarToken);

export default router;
