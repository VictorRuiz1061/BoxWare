import { pool } from "../conexion/conexion.js";

//mostrar administrador
export const mostraradministrador = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM administrador ");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};

//buscar administrador
export const buscaradministrador = async (req, res) => {
  try {
    const id_administrador = req.params.id_administrador;
    const result = await pool.query(
      "SELECT * FROM administrador WHERE id_administrador   = $1",
      [id_administrador]
    );
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json("administrador no encontrado");
    }
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};
// Crear acción administrador

export const crearadministrador = async (req, res) => {
  const {
    fecha_accion,
    rutas,
    descripcion_ruta,
    bandera_accion,
    mensaje_cambio,
    tipo_permiso,
    usuario_id,
  } = req.body;

  try {
    const sql = `
            INSERT INTO administrador (
                fecha_accion, 
                rutas, 
                descripcion_ruta, 
                bandera_accion, 
                mensaje_cambio, 
                tipo_permiso, 
                usuario_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

    const result = await pool.query(sql, [
      fecha_accion,
      rutas,
      descripcion_ruta,
      bandera_accion,
      mensaje_cambio,
      tipo_permiso,
      usuario_id,
    ]);

    if (result.rowCount > 0) {
      return res
        .status(201)
        .json({ mensaje: "Acción registrada exitosamente" });
    } else {
      return res
        .status(404)
        .json({ mensaje: "No se pudo registrar la acción" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Actualizar administrador
export const actualizaradministrador = async (req, res) => {
  const { id_administrador } = req.params;
  const {
    fecha_accion,
    rutas,
    descripcion_ruta,
    bandera_accion,
    mensaje_cambio,
    tipo_permiso,
  } = req.body;

  try {
    const sql = `
            UPDATE administrador 
            SET 
                fecha_accion = $1, 
                rutas = $2, 
                descripcion_ruta = $3, 
                bandera_accion = $4, 
                mensaje_cambio = $5, 
                tipo_permiso = $6
            WHERE id_administrador = $7;  
        `;

    const result = await pool.query(sql, [
      fecha_accion,
      rutas,
      descripcion_ruta,
      bandera_accion,
      mensaje_cambio,
      tipo_permiso,
      id_administrador,
    ]);

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ mensaje: "Administrador actualizado exitosamente" });
    } else {
      return res
        .status(404)
        .json({
          mensaje: "Administrador no encontrado o no se pudo actualizar",
        });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Eliminar administrador
export const eliminaradministrador = async (req, res) => {
  const { id_administrador } = req.params;

  try {
    const sql = "DELETE FROM administrador WHERE id_administrador  = $1";
    const result = await pool.query(sql, [id_administrador]);
    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ mensaje: "administrador eliminado exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "administrador no encontrado" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};
