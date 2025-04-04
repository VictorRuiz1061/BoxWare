import { pool } from "../conexion/conexion.js";

export const listarSedesJp = async (req, res) => {
    try {
        const sql = `SELECT * FROM sedes`;
        const result = await pool.query(sql);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'No hay sedes registradas' });
        }
    } catch (error) {
        console.error("Error al listar sedes:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};

export const registrarSedeJp = async (req, res) => {
    const { id_sede, nombre_sede, direccion_sede, fecha_creacion, fecha_modificacion, centro_sede_id } = req.body;

    if (!id_sede || !nombre_sede || !direccion_sede || !centro_sede_id) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    try {
        const sql = `
            INSERT INTO sedes (id_sede, nombre_sede, direccion_sede, fecha_creacion, fecha_modificacion, centro_sede_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await pool.query(sql, [id_sede, nombre_sede, direccion_sede, fecha_creacion, fecha_modificacion, centro_sede_id]);

        res.status(201).json({ message: "Sede registrada exitosamente" });
    } catch (error) {
        console.error("Error al registrar sede:", error);
        res.status(500).json({ message: "Error del servidor, contacte al administrador." });
    }
};

export const actualizarSedeJp = async (req, res) => {
    const { id_sede } = req.params;
    const { nombre_sede, direccion_sede, fecha_modificacion, centro_sede_id } = req.body;

    try {
        const sql = `
            UPDATE sedes SET
                nombre_sede = ?,
                direccion_sede = ?,
                fecha_modificacion = ?,
                centro_sede_id = ?
            WHERE id_sede = ?
        `;

        const result = await pool.query(sql, [nombre_sede, direccion_sede, fecha_modificacion, centro_sede_id, id_sede]);

        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Sede actualizada correctamente' });
        }
        return res.status(404).json({ message: 'Sede no encontrada o sin cambios.' });
    } catch (error) {
        console.error("Error al actualizar sede:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};

export const buscarSedeJp = async (req, res) => {
    try {
        const { id_sede } = req.params;
        const sql = `SELECT * FROM sedes WHERE id_sede = ?`;
        const result = await pool.query(sql, [id_sede]);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Sede no encontrada' });
        }
    } catch (error) {
        console.error("Error al buscar sede:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};

export const eliminarSedeJp = async (req, res) => {
    try {
        const { id_sede } = req.params;
        const sql = `DELETE FROM sedes WHERE id_sede = ?`;
        const result = await pool.query(sql, [id_sede]);

        if (result.rowCount > 0) {
            return res.status(200).json({ message: 'Sede eliminada con éxito' });
        }
        return res.status(404).json({ message: 'Sede no encontrada' });
    } catch (error) {
        console.error("Error al eliminar sede:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};
