import { pool } from "../conexion/conexion.js";

export const listarMunicipiosJp = async (req, res) => {
    try {
        const sql = `SELECT * FROM municipios`;
        const result = await pool.query(sql);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'No hay municipios registrados' });
        }
    } catch (error) {
        console.error("Error al listar municipios:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};

export const registrarMunicipioJp = async (req, res) => {
    const { id_municipio, nombre_municipio, fecha_creacion, fecha_modificacion } = req.body;

    if (!id_municipio || !nombre_municipio) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    try {
        const sql = `
            INSERT INTO municipios (id_municipio, nombre_municipio, fecha_creacion, fecha_modificacion)
            VALUES ($, $, $, $)
        `;
        await pool.query(sql, [id_municipio, nombre_municipio, fecha_creacion, fecha_modificacion]);

        res.status(201).json({ message: "Municipio registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar municipio:", error);
        res.status(500).json({ message: "Error del servidor, contacte al administrador." });
    }
};

export const actualizarMunicipioJp = async (req, res) => {
    const { id_municipio } = req.params;
    const { nombre_municipio, fecha_modificacion } = req.body;

    try {
        const sql = `
            UPDATE municipios SET
                nombre_municipio = $,
                fecha_modificacion = $
            WHERE id_municipio = $
        `;

        const result = await pool.query(sql, [nombre_municipio, fecha_modificacion, id_municipio]);

        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Municipio actualizado correctamente' });
        }
        return res.status(404).json({ message: 'Municipio no encontrado o sin cambios.' });
    } catch (error) {
        console.error("Error al actualizar municipio:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};

export const buscarMunicipioJp = async (req, res) => {
    try {
        const { id_municipio } = req.params;
        const sql = `SELECT * FROM municipios WHERE id_municipio = $`;
        const result = await pool.query(sql, [id_municipio]);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Municipio no encontrado' });
        }
    } catch (error) {
        console.error("Error al buscar municipio:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};

export const eliminarMunicipioJp = async (req, res) => {
    try {
        const { id_municipio } = req.params;
        const sql = `DELETE FROM municipios WHERE id_municipio = $`;
        const result = await pool.query(sql, [id_municipio]);

        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Municipio eliminado con éxito' });
        }
        return res.status(404).json({ message: 'Municipio no encontrado' });
    } catch (error) {
        console.error("Error al eliminar municipio:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};
