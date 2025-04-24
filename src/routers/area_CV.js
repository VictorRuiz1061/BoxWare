import { Router } from 'express';
import {   mostrarAreas, crearArea,  actualizarArea,  eliminarArea} from '../controllers/area_CV.js';  

const router = Router();

router.get('/areas', mostrarAreas);           
router.post('/areas', crearArea);             
router.put('/areas/:id_area', actualizarArea); 
router.delete('/areas/:id_area', eliminarArea); 

export default router;  
