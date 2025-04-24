import { pool } from "../conexion/conexion.js"; 

// Mostrar tipos de movimiento
export const mostrarTiposMovimiento = async (req, res) => {
    const sql = 'SELECT * FROM tipos_movimiento';
    try {
        const result = await pool.query(sql); 
        return res.status(200).json(result.rows); 
    } catch (e) {
        console.error('Error al mostrar tipos de movimiento:', e);
        return res.status(500).json('Error del servidor al mostrar los tipos de movimiento');
    }
}

// Crear tipo de movimiento
export const crearTipoMovimiento = async (req, res) => {
    const { tipo_movimiento, fecha_creacion, fecha_modificacion } = req.body;
    const sql = 'INSERT INTO tipos_movimiento (tipo_movimiento, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3) RETURNING id_tipo_movimiento';
    
    try {
        const result = await pool.query(sql, [tipo_movimiento, fecha_creacion, fecha_modificacion]);
        return res.status(200).json({ 
            status: 200, 
            message: "El tipo de movimiento se registró en el sistema", 
            id_tipo_movimiento: result.rows[0].id_tipo_movimiento 
        });
    } catch (e) {
        console.error('Error al crear el tipo de movimiento:', e);
        return res.status(500).json({ 
            message: 'Error del servidor al crear el tipo de movimiento', 
            error: e.message 
        });
    }
}

// Actualizar tipo de movimiento
export const actualizarTipoMovimiento = async (req, res) => {
    const { id_tipo_movimiento } = req.params;  
    const { tipo_movimiento, fecha_creacion, fecha_modificacion } = req.body;

    const sql = `UPDATE tipos_movimiento SET tipo_movimiento = $1, fecha_creacion = $2, fecha_modificacion = $3 WHERE id_tipo_movimiento = $4 RETURNING id_tipo_movimiento;`;

    try {
        const result = await pool.query(sql, [
            tipo_movimiento,
            fecha_creacion, 
            fecha_modificacion,
            id_tipo_movimiento
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                status: 200,
                message: "El tipo de movimiento ha sido actualizado",
                id_tipo_movimiento: result.rows[0].id_tipo_movimiento 
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "No se ha podido actualizar el tipo de movimiento" 
            });
        }
    } catch (e) {
        console.error('Error al actualizar el tipo de movimiento:', e);  
        return res.status(500).json({ 
            message: 'Error del servidor al actualizar el tipo de movimiento',
            error: e.message
        });
    }
};

// Eliminar tipo de movimiento
export const eliminarTipoMovimiento = async (req, res) => {
    const { id_tipo_movimiento } = req.params;
    const sql = 'DELETE FROM tipos_movimiento WHERE id_tipo_movimiento = $1 RETURNING id_tipo_movimiento'; 
    
    try {
        const result = await pool.query(sql, [id_tipo_movimiento]);
        if (result.rowCount > 0) {
            return res.status(200).json({ 
                status: 200, 
                message: "El tipo de movimiento ha sido eliminado" 
            });
        } else {
            return res.status(400).json({ 
                status: 400, 
                message: "No se ha podido eliminar el tipo de movimiento" 
            });
        }
    } catch (e) {
        console.error('Error al eliminar el tipo de movimiento:', e);
        return res.status(500).json('Error del servidor al eliminar el tipo de movimiento');
    }
} 