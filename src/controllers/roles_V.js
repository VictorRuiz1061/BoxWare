import { pool } from "../conexion/conexion.js"; 

// Mostrar roles
export const mostrarRoles = async (req, res) => {
    const sql = 'SELECT * FROM roles';
    try {
        const result = await pool.query(sql); 
        return res.status(200).json(result.rows); 
    } catch (e) {
        console.error('Error al mostrar roles:', e);
        return res.status(500).json('Error del servidor al mostrar los roles');
    }
}

// Crear rol
export const crearRol = async (req, res) => {
    const { nombre_rol, descripcion, estado, fecha_creacion, fecha_modificacion } = req.body;
    const sql = 'INSERT INTO roles (nombre_rol, descripcion, estado, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3, $4, $5) RETURNING id_rol';
    
    try {
        const result = await pool.query(sql, [
            nombre_rol, 
            descripcion, 
            estado, 
            fecha_creacion || new Date(), 
            fecha_modificacion || new Date()
        ]);
        return res.status(200).json({ 
            status: 200, 
            message: "El rol se registró en el sistema", 
            id_rol: result.rows[0].id_rol 
        });
    } catch (e) {
        console.error('Error al crear el rol:', e);
        return res.status(500).json({ 
            message: 'Error del servidor al crear el rol', 
            error: e.message 
        });
    }
}

// Actualizar rol
export const actualizarRol = async (req, res) => {
    const { id_rol } = req.params;  
    const { nombre_rol, descripcion, estado, fecha_creacion, fecha_modificacion } = req.body;

    const sql = `UPDATE roles 
                 SET nombre_rol = $1, 
                     descripcion = $2, 
                     estado = $3, 
                     fecha_creacion = $4, 
                     fecha_modificacion = $5 
                 WHERE id_rol = $6 
                 RETURNING id_rol;`;

    try {
        const result = await pool.query(sql, [
            nombre_rol,
            descripcion,
            estado,
            fecha_creacion,
            fecha_modificacion || new Date(),
            id_rol
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                status: 200,
                message: "El rol ha sido actualizado",
                id_rol: result.rows[0].id_rol 
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "No se ha podido actualizar el rol" 
            });
        }
    } catch (e) {
        console.error('Error al actualizar el rol:', e);  
        return res.status(500).json({ 
            message: 'Error del servidor al actualizar el rol',
            error: e.message
        });
    }
};

// Eliminar rol
export const eliminarRol = async (req, res) => {
    const { id_rol } = req.params;
    const sql = 'DELETE FROM roles WHERE id_rol = $1 RETURNING id_rol'; 
    
    try {
        const result = await pool.query(sql, [id_rol]);
        if (result.rowCount > 0) {
            return res.status(200).json({ 
                status: 200, 
                message: "El rol ha sido eliminado" 
            });
        } else {
            return res.status(400).json({ 
                status: 400, 
                message: "No se ha podido eliminar el rol" 
            });
        }
    } catch (e) {
        console.error('Error al eliminar el rol:', e);
        return res.status(500).json('Error del servidor al eliminar el rol');
    }
} 