import { pool } from "../conexion/conexion.js";

// Mostrar permisos
export const mostrarPermisos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM permisos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};

// Crear permiso
export const crearPermiso = async (req, res) => {
  const { nombre, codigo_nombre, modulo_id, rol_id } = req.body;

  try {
    const sql = `
      INSERT INTO permisos (
        nombre,
        codigo_nombre,
        modulo_id,
        rol_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      nombre,
      codigo_nombre,
      modulo_id,
      rol_id,
    ]);

    if (result.rowCount > 0) {
      return res.status(201).json({
        mensaje: "Permiso creado exitosamente",
        permiso: result.rows[0],
      });
    } else {
      return res.status(400).json({ mensaje: "No se pudo crear el permiso" });
    }
  } catch (error) {
    console.error("Error al crear el permiso:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// Actualizar permiso
export const actualizarPermiso = async (req, res) => {
  const { id_permiso } = req.params;
  const { nombre, codigo_nombre, modulo_id, rol_id } = req.body;

  try {
    const sql = `
      UPDATE permisos
      SET 
        nombre = $1,
        codigo_nombre = $2,
        modulo_id = $3,
        rol_id = $4
      WHERE id_permiso = $5
      RETURNING *
    `;

    const result = await pool.query(sql, [
      nombre,
      codigo_nombre,
      modulo_id,
      rol_id,
      id_permiso,
    ]);

    if (result.rowCount > 0) {
      return res.status(200).json({
        mensaje: "Permiso actualizado exitosamente",
        permiso: result.rows[0],
      });
    } else {
      return res.status(404).json({ mensaje: "Permiso no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el permiso:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// Eliminar permiso
export const eliminarPermiso = async (req, res) => {
  const { id_permiso } = req.params;

  try {
    const sql = "DELETE FROM permisos WHERE id_permiso = $1 RETURNING *";
    const result = await pool.query(sql, [id_permiso]);

    if (result.rowCount > 0) {
      return res.status(200).json({
        mensaje: "Permiso eliminado exitosamente",
        permiso: result.rows[0],
      });
    } else {
      return res.status(404).json({ mensaje: "Permiso no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el permiso:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
