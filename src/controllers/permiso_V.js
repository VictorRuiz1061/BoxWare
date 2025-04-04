import { pool } from "../conexion/conexion.js";

//mostrar tipos_permisos
export const mostrarPermisos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM permisos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};

export const buscarPermiso = async (req, res) => {
  const id_permiso = req.params.id_permiso; // Accede correctamente al parámetro
  try {
    const result = await pool.query(
      "SELECT * FROM permisos WHERE id_permiso = $1",
      [id_permiso]
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
export const crearPermiso = async (req, res) => {
  const { nombre, tipo_permiso_id, codigo_nombre } = req.body;

  try {
    const sql =
      "INSERT INTO permisos ( nombre , tipo_permiso_id , codigo_nombre) VALUES ($1,$2,$3)";

    const result = await pool.query(sql, [
      nombre,
      tipo_permiso_id,
      codigo_nombre,
    ]);
    if (result.rowCount > 0) {
      return res.status(201).json({ mensaje: "permiso creado exitosamente" });
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
export const actualizarPermiso = async (req, res) => {
  const { id_permiso } = req.params;
  const { nombre, tipo_permiso_id, codigo_nombre } = req.body;

  try {
    const sql = `
            UPDATE permisos 
            SET nombre=$1 ,tipo_permiso_id=$2 ,codigo_nombre=$3
            WHERE  id_permiso = $4;
        `;
    const result = await pool.query(sql, [
      nombre,
      tipo_permiso_id,
      codigo_nombre,
      id_permiso,
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
export const eliminarPermiso = async (req, res) => {
  const { id_permiso } = req.params;

  try {
    const sql = "DELETE FROM permisos WHERE  id_permiso = $1";
    const result = await pool.query(sql, [id_permiso]);
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
