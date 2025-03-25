import { pool } from "../conexion/conexion.js";

//mostrar tipos_permisos
export const mostrarPermisosUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM  permisos_usuario");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};
export const buscarPermisoUsers = async (req, res) => {
  const id_permiso_usuario = req.params.id_permiso_usuario; // Accede correctamente al parámetro
  try {
    const result = await pool.query(
      "SELECT * FROM  permisos_usuario   WHERE id_permiso_usuario = $1",
      [id_permiso_usuario]
    );

    // Verifica si se encontraron registros
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]); // Si se encuentra el permiso, lo retorna
    } else {
      return res.status(404).json({ mensaje: "Permiso no encontrado" }); // Si no se encuentra
    }
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    return res
      .status(500)
      .json({ mensaje: "Error en la consulta", error: error.message }); // Retorna el error detallado
  }
};

// Crear usuario
export const crearPermisoUsers = async (req, res) => {
  const { usuario_id, permiso_id } = req.body;

  try {
    const sql =
      "INSERT INTO permisos_usuario(usuario_id, permiso_id) VALUES ($1, $2)";
    const result = await pool.query(sql, [usuario_id, permiso_id]);
    if (result.rowCount > 0) {
      return res.status(201).json({ mensaje: "Permiso creado exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "No se pudo crear el permiso" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Actualizar usuario
export const actualizarPermisoUsers = async (req, res) => {
  const { id_permiso_usuario } = req.params;
  const { usuario_id, permiso_id } = req.body;

  try {
    const sql = `
            UPDATE  permisos_usuario   
            SET usuario_id =$1, permiso_id=$2
            WHERE  id_permiso_usuario = $3;
        `;
    const result = await pool.query(sql, [
      usuario_id,
      permiso_id,
      id_permiso_usuario,
    ]);

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ mensaje: "permiso actualizado exitosamente" });
    } else {
      return res
        .status(404)
        .json({ mensaje: "permiso no encontrado o no se pudo actualizar" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Eliminar usuario
export const eliminarPermisoUsers = async (req, res) => {
  const { id_permiso_usuario } = req.params;

  try {
    const sql =
      "DELETE FROM  permisos_usuario   WHERE  id_permiso_usuario = $1";
    const result = await pool.query(sql, [id_permiso_usuario]);
    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ mensaje: "permiso eliminado exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "permiso no encontrado" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};
