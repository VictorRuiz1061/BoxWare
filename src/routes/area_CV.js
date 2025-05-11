import { Router } from 'express';
import {   mostrarAreas, crearArea,  actualizarArea,  eliminarArea} from '../controllers/area_CV.js';  
import { verificarToken } from "../controllers/seguridad.controller.js";

const router = Router();

router.get('/areas', verificarToken, mostrarAreas);           
router.post('/areas', verificarToken, crearArea);             
router.put('/areas/:id_area', verificarToken, actualizarArea); 
router.delete('/areas/:id_area', verificarToken, eliminarArea); 

export default router;  
