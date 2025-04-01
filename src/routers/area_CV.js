import { Router } from 'express';
import {   mostrarAreas,  buscarArea,  crearArea,  actualizarArea,  eliminarArea} from '../controllers/area_CV.js';  

const router = Router();

// Rutas para áreas
router.get('/areas', mostrarAreas);           
router.get('/areas/:id_area', buscarArea);    
router.post('/areas', crearArea);             
router.put('/areas/:id_area', actualizarArea); 
router.delete('/areas/:id_area', eliminarArea); 

export default router;  
