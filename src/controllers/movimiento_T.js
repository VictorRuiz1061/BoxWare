import { pool } from "../conexion/conexion.js"; 

// Mostrar movimientos
export const mostrarMovimientos = async (req, res) => {
    const sql = 'SELECT * FROM movimientos';
    try {
        const result = await pool.query(sql); 
        return res.status(200).json(result.rows); 
    } catch (e) {
        return res.status(500).json('Error del servidor al mostrar los movimientos');
    }
}

// Crear movimiento
export const crearMovimiento = async (req, res) => {
    const { fecha_creacion, fecha_modificacion, usuario_movimiento_id, tipo_movimiento_id } = req.body;
    const sql = 'INSERT INTO movimientos (fecha_creacion, fecha_modificacion, usuario_movimiento_id, tipo_movimiento_id) VALUES ($1, $2, $3, $4) RETURNING id_movimiento';
    try {
        const result = await pool.query(sql, [fecha_creacion, fecha_modificacion, usuario_movimiento_id, tipo_movimiento_id]);
        return res.status(200).json({ status: 200, message: "El movimiento se registró en el sistema", id_movimiento: result.rows[0].id_movimiento });
    } catch (e) {
        console.error('Error al crear el movimiento:', e);
        return res.status(500).json({ message: 'Error del servidor al crear el movimiento', error: e.message });
    }
}

// Actualizar movimiento
export const actualizarMovimiento = async (req, res) => {
    const { id_movimiento } = req.params;  
    const { fecha_creacion, fecha_modificacion, usuario_movimiento_id, tipo_movimiento_id } = req.body;

    // Verificar si el movimiento existe
    try {
        const checkSql = 'SELECT * FROM movimientos WHERE id_movimiento = $1';
        const checkResult = await pool.query(checkSql, [id_movimiento]);
        
        if (checkResult.rowCount === 0) {
            return res.status(404).json({
                status: 404,
                message: `No se encontró el movimiento con ID ${id_movimiento}`
            });
        }
        
        // Si el movimiento existe, procedemos a actualizarlo
        const sql = `UPDATE movimientos SET fecha_creacion = $1, fecha_modificacion = $2, usuario_movimiento_id = $3, tipo_movimiento_id = $4 WHERE id_movimiento = $5 RETURNING id_movimiento;`;

        console.log("Datos para actualizar:", {
            id_movimiento,
            fecha_creacion,
            fecha_modificacion,
            usuario_movimiento_id,
            tipo_movimiento_id
        });

        const result = await pool.query(sql, [
            fecha_creacion, 
            fecha_modificacion, 
            usuario_movimiento_id, 
            tipo_movimiento_id, 
            id_movimiento
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                status: 200,
                message: "El movimiento ha sido actualizado",
                id_movimiento: result.rows[0].id_movimiento 
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "No se ha podido actualizar el movimiento. Verifica que los valores proporcionados sean válidos." 
            });
        }
    } catch (e) {
        console.error('Error al actualizar el movimiento:', e);  
        return res.status(500).json({ 
            message: 'Error del servidor al actualizar el movimiento',
            error: e.message
        });
    }
};

// Eliminar movimiento
export const eliminarMovimiento = async (req, res) => {
    const { id_movimiento } = req.params;
    const sql = 'DELETE FROM movimientos WHERE id_movimiento = $1 RETURNING id_movimiento'; 
    try {
        const result = await pool.query(sql, [id_movimiento]);
        if (result.rowCount > 0) {
            return res.status(200).json({ status: 200, message: "El movimiento ha sido eliminado" });
        } else {
            return res.status(400).json({ status: 400, message: "No se ha podido eliminar el movimiento" });
        }
    } catch (e) {
        return res.status(500).json('Error del servidor al eliminar el movimiento');
    }
} 