import { pool } from "../conexion/conexion.js";

export const listarCentrosJp = async (req, res) => {
    try {
        const sql = `SELECT * FROM centros`;
        const result = await pool.query(sql);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ error: 'No hay centros registrados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor: ' + error });
    }
};

export const registrarCentrosJp = async (req, res) => {
    const { id_centro, nombre_centro, fecha_creacion, fecha_modificacion, municipio_id } = req.body;

    try {
        const sql = `
            INSERT INTO centros (id_centro, nombre_centro, fecha_creacion, fecha_modificacion, municipio_id)
            VALUES ($, $, $, $, $)
        `;
        await pool.query(sql, [id_centro, nombre_centro, fecha_creacion, fecha_modificacion, municipio_id]);

        res.status(201).json({ 
            message: "Centro registrado exitosamente", 
        });
    } catch (error) {
        console.error("Error al registrar centro:", error);
        res.status(500).json({ message: "Error del servidor: " + error.message });
    }
};

export const actualizarCentrosJp = async (req, res) => {
    try {
        const { id_centro } = req.params;
        const { nombre_centro, fecha_creacion, fecha_modificacion, municipio_id } = req.body;

        const sql = `
            UPDATE centros SET
                nombre_centro = $1,
                fecha_modificacion = $2,
                municipio_id = $3
            WHERE id_centro = $4
        `;

        const result = await pool.query(sql, [
            nombre_centro,
            fecha_modificacion,
            municipio_id,
            id_centro 
        ]);

        if (result.rowCount > 0) {
            res.status(200).json({
                message: 'Centro actualizado correctamente',
            });
        } else {
            res.status(403).json({
                message: 'Error al actualizar el Centro',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor: ' + error.message,
        });
    }
};

export const buscarCentrosJp = async (req, res) => {
    try {
        const { id_centro } = req.params;
        const sql = `SELECT * FROM centros WHERE id_centro = $1`;
        const result = await pool.query(sql, [id_centro]);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({
                message: 'Centro no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const eliminarCentrosJp = async (req, res) => {
    try {
        const { id_centro } = req.params;
        const sql = `DELETE FROM centros WHERE id_centro = $1`;
        const result = await pool.query(sql, [id_centro]);

        if (result.rowCount > 0) {
            res.status(200).json({
                message: 'Centro eliminado con éxito'
            });
        } else {
            res.status(403).json({
                message: 'Error al eliminar el centro'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor: ' + error
        });
    }
};
