import { Router } from "express";
import { mostrarProgramas, crearPrograma, actualizarPrograma, eliminarPrograma } from "../controllers/programas_CV.js";  // Asegúrate de que la ruta sea correcta

const router = Router();
router.get('/programas', mostrarProgramas);
router.post('/programas', crearPrograma);
router.put('/programas/:id_programa', actualizarPrograma);  
router.delete('/programas/:id_programa', eliminarPrograma);

export default router;
