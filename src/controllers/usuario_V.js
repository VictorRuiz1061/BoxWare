import { pool } from "../conexion/conexion.js";
import bcrypt from "bcrypt";

//mostrar usuarios
export const mostrarUsuarios = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};


//crear usuario
export const crearUsuario = async (req, res) => {
  const {
    nombre,
    apellido,
    edad,
    cedula,
    email,
    contrasena,
    telefono,
    estado,
    imagen,
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
      INSERT INTO usuarios (nombre, apellido, edad, cedula, email, contrasena, telefono, estado, imagen, fecha_registro, rol_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_usuario`;

    const result = await pool.query(sql, [
      nombre,
      apellido || null,
      edad || null,
      cedula || null,
      email,
      hashedPassword,
      telefono || null,
      estado || true,
      imagen || null,
      fecha_registro || new Date(),
      rol_id,
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

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  let {
    nombre,
    apellido,
    edad,
    cedula,
    email,
    contrasena,
    telefono,
    estado,
    imagen,
    fecha_registro,
    rol_id,
  } = req.body;

  try {
    // Si se envía una nueva contraseña, encriptarla
    if (contrasena) {
      contrasena = await bcrypt.hash(contrasena, 10);
    } else {
      // Si no se envía, mantener la anterior
      const userResult = await pool.query("SELECT contrasena FROM usuarios WHERE id_usuario = $1", [id_usuario]);
      contrasena = userResult.rows[0].contrasena;
    }

    const sql = `
      UPDATE usuarios 
      SET nombre = $1, apellido = $2, edad = $3, cedula = $4, email = $5, contrasena = $6, 
          telefono = $7, estado = $8, imagen = $9, fecha_registro = $10, rol_id = $11
      WHERE id_usuario = $12;
    `;
    const result = await pool.query(sql, [
      nombre,
      apellido,
      edad,
      cedula,
      email,
      contrasena,
      telefono,
      estado,
      imagen,
      fecha_registro,
      rol_id,
      id_usuario,
    ]);

    if (result.rowCount > 0) {
      return res.status(200).json({ mensaje: "Usuario actualizado exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "Usuario no encontrado o no se pudo actualizar" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const sql = "DELETE FROM usuarios WHERE id_usuario = $1";
    const result = await pool.query(sql, [id_usuario]);
    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ mensaje: "Usuario eliminado exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};
