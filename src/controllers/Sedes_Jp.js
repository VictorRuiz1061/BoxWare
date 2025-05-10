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
    const { nombre_sede, direccion_sede, estado, fecha_creacion, fecha_modificacion, centro_id } = req.body;

    if (!nombre_sede || !direccion_sede || !centro_id) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    try {
        const sql = `
            INSERT INTO sedes (nombre_sede, direccion_sede, estado, fecha_creacion, fecha_modificacion, centro_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const result = await pool.query(sql, [
            nombre_sede,
            direccion_sede,
            estado || true,
            fecha_creacion || new Date(),
            fecha_modificacion || new Date(),
            centro_id
        ]);

        res.status(201).json({ 
            message: "Sede registrada exitosamente",
            sede: result.rows[0]
        });
    } catch (error) {
        console.error("Error al registrar sede:", error);
        res.status(500).json({ message: "Error del servidor, contacte al administrador." });
    }
};

export const actualizarSedeJp = async (req, res) => {
    const { id_sede } = req.params;
    const { nombre_sede, direccion_sede, estado, fecha_modificacion, centro_id } = req.body;

    try {
        const sql = `
            UPDATE sedes SET
                nombre_sede = $1,
                direccion_sede = $2,
                estado = $3,
                fecha_modificacion = $4,
                centro_id = $5
            WHERE id_sede = $6
            RETURNING *
        `;

        const result = await pool.query(sql, [
            nombre_sede,
            direccion_sede,
            estado,
            fecha_modificacion || new Date(),
            centro_id,
            id_sede
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({ 
                message: 'Sede actualizada correctamente',
                sede: result.rows[0]
            });
        }
        return res.status(404).json({ message: 'Sede no encontrada' });
    } catch (error) {
        console.error("Error al actualizar sede:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};

export const eliminarSedeJp = async (req, res) => {
    try {
        const { id_sede } = req.params;
        const sql = `DELETE FROM sedes WHERE id_sede = $1 RETURNING *`;
        const result = await pool.query(sql, [id_sede]);

        if (result.rowCount > 0) {
            return res.status(200).json({ 
                message: 'Sede eliminada con éxito',
                sede: result.rows[0]
            });
        }
        return res.status(404).json({ message: 'Sede no encontrada' });
    } catch (error) {
        console.error("Error al eliminar sede:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};
