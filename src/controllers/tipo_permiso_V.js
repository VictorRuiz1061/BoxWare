import { pool } from "../conexion/conexion.js";

//mostrar tipos_permisos
export const mostrartiposPermisos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tipos_permisos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};

//buscar usuario
export const buscartipoPermiso = async (req, res) => {
  try {
    const id_tipo_permiso = req.params.id_tipo_permiso;
    const result = await pool.query(
      "SELECT * FROM tipos_permisos WHERE id_tipo_permiso= $1",
      [id_tipo_permiso]
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
export const creartipoPermiso = async (req, res) => {
  const { permisos } = req.body;

  try {
    const sql = "INSERT INTO tipos_permisos ( permisos) VALUES ($1)";

    const result = await pool.query(sql, [permisos]);
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
export const actualizartipoPermiso = async (req, res) => {
  const { id_tipo_permiso } = req.params; // Extraer el  id_tipo_permiso de los parámetros de la URL
  const { permisos } = req.body;

  try {
    const sql = `
            UPDATE tipos_permisos 
            SET permisos=$1
            WHERE  id_tipo_permiso = $2;
        `;
    const result = await pool.query(sql, [permisos, id_tipo_permiso]);

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
export const eliminartipoPermiso = async (req, res) => {
  const { id_tipo_permiso } = req.params;

  try {
    const sql = "DELETE FROM tipos_permisos WHERE  id_tipo_permiso = $1";
    const result = await pool.query(sql, [id_tipo_permiso]);
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
