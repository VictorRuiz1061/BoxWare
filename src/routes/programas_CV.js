import { Router } from "express";
import { mostrarProgramas, crearPrograma, actualizarPrograma, eliminarPrograma } from "../controllers/programas_CV.js";  // Asegúrate de que la ruta sea correcta

const router = Router();
router.get('/programa', mostrarProgramas);
router.post('/programa', crearPrograma);
router.put('/programa/:id_programa', actualizarPrograma);  
router.delete('/programa/:id_programa', eliminarPrograma);

export default router;
