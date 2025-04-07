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

//buscar usuario
export const buscarUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario  = $1",
      [id_usuario]
    );
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};
// Crear usuario
export const crearUsuario = async (req, res) => {
  const {
    nombre,
    apellido,
    edad,
    cedula,
    email,
    contrasena,
    telefono,
    inicio_sesion,
    esta_activo,
    fecha_registro,
    rol_id,
  } = req.body;

  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const sql =
      "INSERT INTO usuarios (nombre, apellido, edad, cedula, email, contrasena, telefono, inicio_sesion, esta_activo, fecha_registro, rol_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

    const result = await pool.query(sql, [
      nombre,
      apellido,
      edad,
      cedula,
      email,
      hashedPassword, // Usar la contraseña encriptada
      telefono,
      inicio_sesion,
      esta_activo,
      fecha_registro,
      rol_id,
    ]);
    if (result.rowCount > 0) {
      return res.status(201).json({ mensaje: "Usuario creado exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "No se pudo crear el usuario" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { id_usuario } = req.params; // Extraer el id_usuario de los parámetros de la URL
  const {
    nombre,
    apellido,
    edad,
    cedula,
    email,
    contrasena,
    telefono,
    inicio_sesion,
    esta_activo,
    fecha_registro,
    rol_id,
  } = req.body;

  try {
    // Encriptar la contraseña antes de actualizarla
    const hashedPassword = contrasena ? await bcrypt.hash(contrasena, 10) : null;

    const sql = `
            UPDATE usuarios 
            SET nombre = $1, apellido = $2, edad = $3, cedula = $4, email = $5, contrasena = COALESCE($6, contrasena), 
                telefono = $7, inicio_sesion = $8, esta_activo = $9, fecha_registro = $10, rol_id = $11
            WHERE id_usuario = $12;
        `;
    const result = await pool.query(sql, [
      nombre,
      apellido,
      edad,
      cedula,
      email,
      hashedPassword, // Usar la contraseña encriptada si se proporciona
      telefono,
      inicio_sesion,
      esta_activo,
      fecha_registro,
      rol_id,
      id_usuario,
    ]);

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ mensaje: "Usuario actualizado exitosamente" });
    } else {
      return res
        .status(404)
        .json({ mensaje: "Usuario no encontrado o no se pudo actualizar" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    // Iniciar una transacción
    await pool.query('BEGIN');

    // Eliminar registros relacionados en todas las tablas dependientes
    // 1. Eliminar registros en permisos_usuario
    await pool.query('DELETE FROM permisos_usuario WHERE usuario_id = $1', [id_usuario]);

    // 2. Eliminar registros en administrador
    await pool.query('DELETE FROM administrador WHERE usuario_id = $1', [id_usuario]);

    // 3. Finalmente eliminar el usuario
    const sql = "DELETE FROM usuarios WHERE id_usuario = $1";
    const result = await pool.query(sql, [id_usuario]);

    // Confirmar la transacción
    await pool.query('COMMIT');

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ mensaje: "Usuario y sus registros relacionados eliminados exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (e) {
    // Si hay algún error, revertir la transacción
    await pool.query('ROLLBACK');
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};
