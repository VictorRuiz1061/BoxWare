import { pool } from "../conexion/conexion.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function checkEnvVariables() {
  const requiredEnvVars = ["AUT_SECRET", "AUT_EXPIRE"];
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(`Faltan las siguientes variables de entorno: ${missingVars.join(", ")}`);
  }
}

export const validar = async (req, res) => {
  try {
    checkEnvVariables();
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" }); // Cambiar mensaje
    }

    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    const validContrasena = await bcrypt.compare(contrasena, user.contrasena);

    if (!validContrasena) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = Jwt.sign(
      {
        userId: user.id_usuario,
        nombre: user.nombre,
        rol: user.rol,
      },
      process.env.AUT_SECRET,
      { expiresIn: process.env.AUT_EXPIRE }
    );

    return res.status(200).json({
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
      token,
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error("Error en validar:", error);
    res.status(500).json({
      status: 500,
      message: `Error del servidor: ${error.message}`,
    });
  }
};


// Agregar esta nueva función para registro público
export const registroPublico = async (req, res) => {
  const {
    nombre,
    apellido,
    edad,
    cedula,
    email,
    contrasena,
    telefono,
    estado,
    fecha_registro,
    rol_id,
  } = req.body;

  if (!nombre || !email || !contrasena) {
    return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
  }

  try {
    const existingUserQuery = "SELECT * FROM usuarios WHERE email = $1";
    const existingUserResult = await pool.query(existingUserQuery, [email]);

    if (existingUserResult.rows.length > 0) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const sql = `
      INSERT INTO usuarios (nombre, apellido, edad, cedula, email, contrasena, telefono, estado, fecha_registro, rol_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_usuario`;

    const result = await pool.query(sql, [
      nombre,
      apellido || null,
      edad || null,
      cedula || null,
      email,
      hashedPassword,
      telefono || null,
      estado || true,
      fecha_registro || new Date(),
      rol_id || 2, // Rol predeterminado (por ejemplo, cliente)
    ]);

    res.status(201).json({
      id_usuario: result.rows[0].id_usuario,
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Se requiere Token" });
  }
  try {
    const decoded = Jwt.verify(token, process.env.AUT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
