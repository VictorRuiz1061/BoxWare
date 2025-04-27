import { Router } from "express";
import { mostrarProgramas, crearPrograma, actualizarPrograma, eliminarPrograma } from "../controllers/programas_CV.js";  // Asegúrate de que la ruta sea correcta
import { verificarToken } from "../controllers/seguridad.controller.js";    

const router = Router();
router.get('/programa', verificarToken, mostrarProgramas);
router.post('/programa', verificarToken, crearPrograma);
router.put('/programa/:id_programa', verificarToken, actualizarPrograma);  
router.delete('/programa/:id_programa', verificarToken, eliminarPrograma);

export default router;
