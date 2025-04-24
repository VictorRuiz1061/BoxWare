import { pool } from "../conexion/conexion.js";

// Mostrar módulos
export const mostrarmodulo = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM modulos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};

export const crearmodulo = async (req, res) => {
  const {
    fecha_accion,
    rutas,
    descripcion_ruta,
    bandera_accion,
    mensaje_cambio,
  } = req.body;

  try {
    const sql = `
            INSERT INTO modulos (
                fecha_accion, 
                rutas, 
                descripcion_ruta, 
                bandera_accion, 
                mensaje_cambio
            )
            VALUES ($1, $2, $3, $4, $5)
        `;

    const result = await pool.query(sql, [
      fecha_accion,
      rutas,
      descripcion_ruta,
      bandera_accion,
      mensaje_cambio,
    ]);

    if (result.rowCount > 0) {
      return res.status(201).json({ mensaje: "Módulo creado exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "No se pudo crear el módulo" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Actualizar módulo
export const actualizarmodulo = async (req, res) => {
  const { id_modulo } = req.params;
  const {
    fecha_accion,
    rutas,
    descripcion_ruta,
    bandera_accion,
    mensaje_cambio,
  } = req.body;

  try {
    const sql = `
            UPDATE modulos 
            SET 
                fecha_accion = $1, 
                rutas = $2, 
                descripcion_ruta = $3, 
                bandera_accion = $4, 
                mensaje_cambio = $5
            WHERE id_modulo = $6;  
        `;

    const result = await pool.query(sql, [
      fecha_accion,
      rutas,
      descripcion_ruta,
      bandera_accion,
      mensaje_cambio,
      id_modulo,
    ]);

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ mensaje: "Módulo actualizado exitosamente" });
    } else {
      return res.status(404).json({
        mensaje: "Módulo no encontrado o no se pudo actualizar",
      });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};

// Eliminar módulo
export const eliminarmodulo = async (req, res) => {
  const { id_modulo } = req.params;

  try {
    const sql = "DELETE FROM modulos WHERE id_modulo = $1";
    const result = await pool.query(sql, [id_modulo]);
    if (result.rowCount > 0) {
      return res.status(200).json({ mensaje: "Módulo eliminado exitosamente" });
    } else {
      return res.status(404).json({ mensaje: "Módulo no encontrado" });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: e.message });
  }
};
