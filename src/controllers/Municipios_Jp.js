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
    const { nombre_municipio, estado, fecha_creacion, fecha_modificacion } = req.body;

    if (!nombre_municipio) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    try {
        const sql = `
            INSERT INTO municipios (nombre_municipio, estado, fecha_creacion, fecha_modificacion)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(sql, [
            nombre_municipio, 
            estado || true,
            fecha_creacion || new Date(),
            fecha_modificacion || new Date()
        ]);

        res.status(201).json({ 
            message: "Municipio registrado exitosamente",
            municipio: result.rows[0]
        });
    } catch (error) {
        console.error("Error al registrar municipio:", error);
        res.status(500).json({ message: "Error del servidor, contacte al administrador." });
    }
};

export const actualizarMunicipioJp = async (req, res) => {
    const { id_municipio } = req.params;
    const { nombre_municipio, estado, fecha_modificacion } = req.body;

    try {
        const sql = `
            UPDATE municipios SET
                nombre_municipio = $1,
                estado = $2,
                fecha_modificacion = $3
            WHERE id_municipio = $4
            RETURNING *
        `;

        const result = await pool.query(sql, [
            nombre_municipio, 
            estado,
            fecha_modificacion || new Date(),
            id_municipio
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({ 
                message: 'Municipio actualizado correctamente',
                municipio: result.rows[0]
            });
        }
        return res.status(404).json({ message: 'Municipio no encontrado o sin cambios.' });
    } catch (error) {
        console.error("Error al actualizar municipio:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};

export const eliminarMunicipioJp = async (req, res) => {
    try {
        const { id_municipio } = req.params;
        const sql = `DELETE FROM municipios WHERE id_municipio = $1 RETURNING *`;
        const result = await pool.query(sql, [id_municipio]);

        if (result.rowCount > 0) {
            return res.status(200).json({ 
                message: 'Municipio eliminado con éxito',
                municipio: result.rows[0]
            });
        }
        return res.status(404).json({ message: 'Municipio no encontrado' });
    } catch (error) {
        console.error("Error al eliminar municipio:", error);
        res.status(500).json({ message: 'Error del servidor, contacte al administrador.' });
    }
};
