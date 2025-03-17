import { pool } from "../conexion/conexion.js"; 

// Mostrar sitios
export const mostrarSitios = async (req, res) => {
    const sql = 'SELECT * FROM sitios';
    try {
        const result = await pool.query(sql); 
        return res.status(200).json(result.rows); 
    } catch (e) {
        return res.status(500).json('Error del servid_sitio or al mostrar los sitios');
    }
}

// Buscar sitio
export const buscarSitio = async (req, res) => {
    const { id_sitio } = req.params;  // Obtenemos el id_sitio desde los parámetros de la ruta
    const sql = 'SELECT * FROM sitios WHERE id_sitio = $1';  // Corregimos la condición WHERE
    
    try {
        const result = await pool.query(sql, [id_sitio]);
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows);  // Devuelve el sitio si se encuentra
        } else {
            return res.status(400).json({ status: 400, message: "El sitio no existe" });
        }
    } catch (e) {
        console.error('Error al buscar el sitio:', e);  // Imprime el error para depurar
        return res.status(500).json({ message: 'Error del servidor al buscar el sitio', error: e.message });
    }
}

export const crearSitio = async (req, res) => {
    const {  nombre_sitio , ubicacion , fecha_creacion , ficha_tecnica , fecha_modificacion , persona_encargada_id , tipo_sitio_id } = req.body;
    const sql = 'INSERT INTO sitios ( nombre_sitio , ubicacion , fecha_creacion , ficha_tecnica , fecha_modificacion , persona_encargada_id , tipo_sitio_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_sitio';
    try {
        const result = await pool.query(sql, [ nombre_sitio , ubicacion , fecha_creacion , ficha_tecnica , fecha_modificacion , persona_encargada_id , tipo_sitio_id]);
        return res.status(200).json({ status: 200, message: "El sitio se registró en el sistema", id_sitio: result.rows[0].id_sitio });
    } catch (e) {
        console.error('Error al crear el sitio:', e);  // Esto imprime el error completo en la consola
        return res.status(500).json({ message: 'Error del servidor al crear el sitio', error: e.message });
    }
}


// Actualizar sitio
export const actualizarSitio = async (req, res) => {
    const { id_sitio } = req.params;  
    const { nombre_sitio, ubicacion, fecha_creacion, ficha_tecnica, fecha_modificacion, persona_encargada_id, tipo_sitio_id } = req.body;


    const sql = `UPDATE sitios  SET  nombre_sitio = $1, ubicacion = $2,ficha_tecnica = $3,fecha_creacion = $4, fecha_modificacion = $5, persona_encargada_id = $6, tipo_sitio_id = $7  WHERE id_sitio = $8 RETURNING id_sitio; `;

    try {
        const result = await pool.query(sql, [nombre_sitio,ubicacion,ficha_tecnica,fecha_creacion,fecha_modificacion,persona_encargada_id,tipo_sitio_id,id_sitio
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({status: 200,message: "El sitio ha sido actualizado",id_sitio: result.rows[0].id_sitio });
        } else {
            return res.status(400).json({status: 400,message: "No se ha podido actualizar el sitio" });
        }
    } catch (e) {
        console.error('Error al actualizar el sitio:', e);  
        return res.status(500).json({ message: 'Error del servidor al actualizar el sitio',error: e.message
        });
    }
};


// Eliminar sitio
export const eliminarSitio = async (req, res) => {
    const { id_sitio } = req.params;
    const sql = 'DELETE FROM sitios WHERE id_sitio = $1 RETURNING id_sitio '; 
    try {
        const result = await pool.query(sql, [id_sitio ]);
        if (result.rowCount > 0) {
            return res.status(200).json({ status: 200, message: "El sitio ha sid_sitio o eliminado" });
        } else {
            return res.status(400).json({ status: 400, message: "No se ha podid_sitio o eliminar el sitio" });
        }
    } catch (e) {
        return res.status(500).json('Error del servid_sitio or al eliminar el sitio');
    }
}
