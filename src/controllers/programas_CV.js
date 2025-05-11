import { pool } from "../conexion/conexion.js";

// Mostrar todos los programas
export const mostrarProgramas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM programas");
    if (result.rows.length === 0) {
      return res.status(200).json({
        mensaje: "No hay programas registrados",
        datos: [],
      });
    }
    res.status(200).json({
      mensaje: "Programas encontrados",
      datos: result.rows,
    });
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json({
      mensaje: "Error en la consulta",
      error: error.message,
    });
  }
};

// Crear programa
export const crearPrograma = async (req, res) => {
  const { nombre_programa, area_id } = req.body;

  if (!nombre_programa || !area_id) {
    return res.status(400).json({
      mensaje: "El nombre del programa y el área son requeridos",
    });
  }

  try {
    const sql = `
            INSERT INTO programas(nombre_programa, fecha_creacion, area_id) VALUES ($1, CURRENT_TIMESTAMP, $2) 
            RETURNING *`;

    const result = await pool.query(sql, [nombre_programa, area_id]);

    return res.status(201).json({
      mensaje: "Programa creado exitosamente",
      programa: result.rows[0],
    });
  } catch (error) {
    console.error("Error al crear el programa:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// Actualizar programa
export const actualizarPrograma = async (req, res) => {
  const { id_programa } = req.params;
  const { nombre_programa, area_id } = req.body;

  if (!nombre_programa || !area_id) {
    return res.status(400).json({
      mensaje: "El nombre del programa y el área son requeridos",
    });
  }

  try {
    const sql = `
            UPDATE programas 
            SET nombre_programa = $1, fecha_modificacion = CURRENT_TIMESTAMP,  area_id = $2
            WHERE id_programa = $3
            RETURNING *`;

    const result = await pool.query(sql, [
      nombre_programa,
      area_id,
      id_programa,
    ]);

    if (result.rows.length > 0) {
      return res.status(200).json({
        mensaje: "Programa actualizado exitosamente",
        programa: result.rows[0],
      });
    } else {
      return res.status(404).json({
        mensaje: "Programa no encontrado o no se pudo actualizar",
      });
    }
  } catch (error) {
    console.error("Error al actualizar el programa:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// Eliminar programa
export const eliminarPrograma = async (req, res) => {
  const { id_programa } = req.params;

  if (!id_programa) {
    return res.status(400).json({
      mensaje: "El ID del programa es requerido",
    });
  }

  try {
    const sql = "DELETE FROM programas WHERE id_programa = $1 RETURNING *";
    const result = await pool.query(sql, [id_programa]);

    if (result.rows.length > 0) {
      return res.status(200).json({
        mensaje: "Programa eliminado exitosamente",
        programa: result.rows[0],
      });
    } else {
      return res.status(404).json({
        mensaje: "Programa no encontrado",
      });
    }
  } catch (error) {
    console.error("Error al eliminar el programa:", error.message);
    return res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
