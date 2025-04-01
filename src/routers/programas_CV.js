import { Router } from "express";
import { mostrarProgramas, buscarPrograma, crearPrograma, actualizarPrograma, eliminarPrograma } from "../controllers/programas_CV.js";  // Asegúrate de que la ruta sea correcta

const router = Router();
router.get('/programa', mostrarProgramas);
router.get('/programa/:id_permiso_usuario', buscarPrograma);  
router.post('/programa/crear', crearPrograma);
router.put('/programa/actualizar/:id_permiso_usuario', actualizarPrograma);  
router.delete('/programa/eliminar/:id_permiso_usuario', eliminarPrograma);

export default router;
