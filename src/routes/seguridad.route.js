import { Router } from "express";
import { validar, registroPublico,  } from "../controllers/seguridad.controller.js";

const Seguridad = Router(); 

Seguridad.post("/validacion", validar);
Seguridad.post("/registrar", registroPublico);

export default Seguridad;
