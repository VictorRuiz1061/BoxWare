import { pool } from "../conexion/conexion.js";

// Mostrar módulos
export const mostrarModulos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM modulos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json("Error en la consulta");
  }
};

// Crear módulo
export const crearModulo = async (req, res) => {
  const {
    fecha_accion,
    rutas,
    descripcion_ruta,
    mensaje_cambio,
    estado,
    fecha_creacion
  } = req.body;

  try {
    const sql = `
      INSERT INTO modulos (
        fecha_accion,
        rutas,
        descripcion_ruta,
        mensaje_cambio,
        estado,
        fecha_creacion
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      fecha_accion || new Date(),
      rutas,
      descripcion_ruta,
      mensaje_cambio,
      estado || true,
      fecha_creacion || new Date()
    ]);

    if (result.rowCount > 0) {
      return res.status(201).json({
        mensaje: "Módulo creado exitosamente",
        modulo: result.rows[0]
      });
    } else {
      return res.status(404).json({ mensaje: "No se pudo crear el módulo" });
    }
  } catch (error) {
    console.error("Error al crear el módulo:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// Actualizar módulo
export const actualizarModulo = async (req, res) => {
  const { id_modulo } = req.params;
  const {
    fecha_accion,
    rutas,
    descripcion_ruta,
    mensaje_cambio,
    estado,
    fecha_creacion
  } = req.body;

  try {
    const sql = `
      UPDATE modulos
      SET 
        fecha_accion = $1,
        rutas = $2,
        descripcion_ruta = $3,
        mensaje_cambio = $4,
        estado = $5,
        fecha_creacion = $6
      WHERE id_modulo = $7
      RETURNING *
    `;

    const result = await pool.query(sql, [
      fecha_accion,
      rutas,
      descripcion_ruta,
      mensaje_cambio,
      estado,
      fecha_creacion,
      id_modulo
    ]);

    if (result.rowCount > 0) {
      return res.status(200).json({
        mensaje: "Módulo actualizado exitosamente",
        modulo: result.rows[0]
      });
    } else {
      return res.status(404).json({
        mensaje: "Módulo no encontrado",
      });
    }
  } catch (error) {
    console.error("Error al actualizar el módulo:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// Eliminar módulo
export const eliminarModulo = async (req, res) => {
  const { id_modulo } = req.params;

  try {
    const sql = "DELETE FROM modulos WHERE id_modulo = $1 RETURNING *";
    const result = await pool.query(sql, [id_modulo]);

    if (result.rowCount > 0) {
      return res.status(200).json({
        mensaje: "Módulo eliminado exitosamente",
        modulo: result.rows[0]
      });
    } else {
      return res.status(404).json({ mensaje: "Módulo no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el módulo:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
