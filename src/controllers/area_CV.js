import { pool } from "../conexion/conexion.js";

// Listar todas las áreas
export const mostrarAreas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM areas'); 
        res.status(200).json(result.rows); 
    } catch (error) {
        console.error('Error en la consulta:', error.message);
        res.status(500).json({ mensaje: 'Error en la consulta', error: error.message });
    }
}

// Buscar área por ID
export const buscarArea = async (req, res) => {
    const id_area = req.params.id_area;
    try {
        const result = await pool.query('SELECT * FROM areas WHERE id_area = $1', [id_area]);

        if(result.rows.length > 0){
            return res.status(200).json(result.rows[0]);
        } else {
            return res.status(404).json({ mensaje: 'Área no encontrada' });
        }
    } catch (error) {
        console.error('Error en la consulta:', error.message);
        return res.status(500).json({ mensaje: 'Error en la consulta', error: error.message });
    }
};

// Crear área
export const crearArea = async (req, res) => {
    const { nombre_area } = req.body;
    
    try {
        const sql = `
            INSERT INTO areas (nombre_area, fecha_creacion, fecha_modificacion) 
            VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;
        
        const result = await pool.query(sql, [nombre_area]);
        if (result.rowCount > 0) {
            return res.status(201).json({ mensaje: 'Área creada exitosamente' });
        } else {
            return res.status(404).json({ mensaje: 'No se pudo crear el área' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

// Actualizar área
export const actualizarArea = async (req, res) => {
    const { id_area } = req.params; 
    const { nombre_area } = req.body;

    try {
        const sql = `
            UPDATE areas 
            SET nombre_area = $1, 
                fecha_modificacion = CURRENT_TIMESTAMP
            WHERE id_area = $2
        `;
        const result = await pool.query(sql, [nombre_area, id_area]);

        if (result.rowCount > 0) {
            return res.status(200).json({ mensaje: 'Área actualizada exitosamente' });
        } else {
            return res.status(404).json({ mensaje: 'Área no encontrada o no se pudo actualizar' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

// Eliminar área
export const eliminarArea = async (req, res) => {
    const { id_area } = req.params; 

    try {
        const sql = 'DELETE FROM areas WHERE id_area = $1';
        const result = await pool.query(sql, [id_area]);
        if (result.rowCount > 0) {
            return res.status(200).json({ mensaje: 'Área eliminada exitosamente' });
        } else {
            return res.status(404).json({ mensaje: 'Área no encontrada' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};