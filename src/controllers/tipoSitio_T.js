import { pool } from "../conexion/conexion.js"; 

// Mostrar tipos de sitio
export const mostrarTiposSitio = async (req, res) => {
    const sql = 'SELECT * FROM tipos_sitio';
    try {
        const result = await pool.query(sql); 
        return res.status(200).json(result.rows); 
    } catch (e) {
        console.error('Error al mostrar tipos de sitio:', e);
        return res.status(500).json('Error del servidor al mostrar los tipos de sitio');
    }
}

// Buscar tipo de sitio
export const buscarTipoSitio = async (req, res) => {
    const { id_tipo_sitio } = req.params;
    const sql = 'SELECT * FROM tipos_sitio WHERE id_tipo_sitio = $1';
    
    try {
        const result = await pool.query(sql, [id_tipo_sitio]);
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(400).json({ status: 400, message: "El tipo de sitio no existe" });
        }
    } catch (e) {
        console.error('Error al buscar el tipo de sitio:', e);
        return res.status(500).json({ message: 'Error del servidor al buscar el tipo de sitio', error: e.message });
    }
}

// Crear tipo de sitio
export const crearTipoSitio = async (req, res) => {
    const { nombre_tipo_sitio, fecha_creacion, fecha_modificacion } = req.body;
    const sql = 'INSERT INTO tipos_sitio (nombre_tipo_sitio, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3) RETURNING id_tipo_sitio';
    
    try {
        const result = await pool.query(sql, [nombre_tipo_sitio, fecha_creacion, fecha_modificacion]);
        return res.status(200).json({ 
            status: 200, 
            message: "El tipo de sitio se registró en el sistema", 
            id_tipo_sitio: result.rows[0].id_tipo_sitio 
        });
    } catch (e) {
        console.error('Error al crear el tipo de sitio:', e);
        return res.status(500).json({ 
            message: 'Error del servidor al crear el tipo de sitio', 
            error: e.message 
        });
    }
}

// Actualizar tipo de sitio
export const actualizarTipoSitio = async (req, res) => {
    const { id_tipo_sitio } = req.params;  
    const { nombre_tipo_sitio, fecha_creacion, fecha_modificacion } = req.body;

    const sql = `UPDATE tipos_sitio SET nombre_tipo_sitio = $1, fecha_creacion = $2, fecha_modificacion = $3 WHERE id_tipo_sitio = $4 RETURNING id_tipo_sitio;`;

    try {
        const result = await pool.query(sql, [
            nombre_tipo_sitio,
            fecha_creacion, 
            fecha_modificacion,
            id_tipo_sitio
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                status: 200,
                message: "El tipo de sitio ha sido actualizado",
                id_tipo_sitio: result.rows[0].id_tipo_sitio 
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "No se ha podido actualizar el tipo de sitio" 
            });
        }
    } catch (e) {
        console.error('Error al actualizar el tipo de sitio:', e);  
        return res.status(500).json({ 
            message: 'Error del servidor al actualizar el tipo de sitio',
            error: e.message
        });
    }
};

// Eliminar tipo de sitio
export const eliminarTipoSitio = async (req, res) => {
    const { id_tipo_sitio } = req.params;
    const sql = 'DELETE FROM tipos_sitio WHERE id_tipo_sitio = $1 RETURNING id_tipo_sitio'; 
    
    try {
        const result = await pool.query(sql, [id_tipo_sitio]);
        if (result.rowCount > 0) {
            return res.status(200).json({ 
                status: 200, 
                message: "El tipo de sitio ha sido eliminado" 
            });
        } else {
            return res.status(400).json({ 
                status: 400, 
                message: "No se ha podido eliminar el tipo de sitio" 
            });
        }
    } catch (e) {
        console.error('Error al eliminar el tipo de sitio:', e);
        return res.status(500).json('Error del servidor al eliminar el tipo de sitio');
    }
} 