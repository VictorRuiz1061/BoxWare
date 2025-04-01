import { pool } from "../conexion/conexion.js";

// Mostrar todas las fichas
export const mostrarFichas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM fichas');
        if (result.rows.length === 0) {
            return res.status(200).json({
                mensaje: 'No hay fichas registradas',
                datos: []
            });
        }
        res.status(200).json({
            mensaje: 'Fichas encontradas',
            datos: result.rows
        });
    } catch (error) {
        console.error('Error en la consulta:', error.message);
        res.status(500).json({ 
            mensaje: 'Error en la consulta',
            error: error.message 
        });
    }
}

// Buscar ficha por ID
export const buscarFicha = async (req, res) => {
    const { id_ficha } = req.params;

    if (!id_ficha) {
        return res.status(400).json({
            mensaje: 'El ID de la ficha es requerido'
        });
    }

    try {
        const result = await pool.query('SELECT * FROM fichas WHERE id_ficha = $1', [id_ficha]);
        
        if (result.rows.length > 0) {
            return res.status(200).json({
                mensaje: 'Ficha encontrada',
                ficha: result.rows[0]
            });
        } else {
            return res.status(404).json({
                mensaje: 'Ficha no encontrada'
            });
        }
    } catch (error) {
        console.error('Error en la consulta:', error.message);
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

// Crear ficha
export const crearFicha = async (req, res) => {
    const { usuario_ficha_id, programa_id } = req.body;

    if (!usuario_ficha_id || !programa_id) {
        return res.status(400).json({
            mensaje: 'El ID del usuario y el ID del programa son requeridos'
        });
    }

    try {
        const sql = `
            INSERT INTO fichas (
                fecha_creacion,
                fecha_modificacion,
                usuario_ficha_id,
                programa_id
            ) VALUES (
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP,
                $1, $2
            ) RETURNING *
        `;
        
        const result = await pool.query(sql, [usuario_ficha_id, programa_id]);
        return res.status(201).json({
            mensaje: 'Ficha creada exitosamente',
            ficha: result.rows[0]
        });
    } catch (error) {
        console.error('Error al crear la ficha:', error.message);
        return res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

// Actualizar ficha
export const actualizarFicha = async (req, res) => {
    const { id_ficha } = req.params;
    const { usuario_ficha_id, programa_id } = req.body;

    if (!usuario_ficha_id || !programa_id) {
        return res.status(400).json({
            mensaje: 'El ID del usuario y el ID del programa son requeridos'
        });
    }

    try {
        const sql = `
            UPDATE fichas 
            SET fecha_modificacion = CURRENT_TIMESTAMP,
                usuario_ficha_id = $1,
                programa_id = $2
            WHERE id_ficha = $3
            RETURNING *
        `;
        
        const result = await pool.query(sql, [usuario_ficha_id, programa_id, id_ficha]);

        if (result.rows.length > 0) {
            return res.status(200).json({
                mensaje: 'Ficha actualizada exitosamente',
                ficha: result.rows[0]
            });
        } else {
            return res.status(404).json({
                mensaje: 'Ficha no encontrada'
            });
        }
    } catch (error) {
        console.error('Error al actualizar la ficha:', error.message);
        return res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

// Eliminar ficha
export const eliminarFicha = async (req, res) => {
    const { id_ficha } = req.params;

    if (!id_ficha) {
        return res.status(400).json({
            mensaje: 'El ID de la ficha es requerido'
        });
    }

    try {
        const sql = 'DELETE FROM fichas WHERE id_ficha = $1 RETURNING *';
        const result = await pool.query(sql, [id_ficha]);
        
        if (result.rows.length > 0) {
            return res.status(200).json({
                mensaje: 'Ficha eliminada exitosamente',
                ficha: result.rows[0]
            });
        } else {
            return res.status(404).json({
                mensaje: 'Ficha no encontrada'
            });
        }
    } catch (error) {
        console.error('Error al eliminar la ficha:', error.message);
        return res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}