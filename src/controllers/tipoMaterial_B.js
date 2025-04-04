import { pool } from "../conexion/conexion.js";

// Mostrar todos los tipos de material
export const mostrarTipoMaterial = async (req, res) => {
    const sql = 'SELECT * FROM tipo_materiales'; 
    try {
        const result = await pool.query(sql);
        return res.status(200).json(result.rows); 
    } catch (e) {
        console.error('Error al mostrar los tipos de material:', e); 
        return res.status(500).json({
            message: 'Error del servidor al mostrar los tipo_materiales',
            error: e.message 
        });
    }
}


export const buscarTipoMaterial = async (req, res) => {
    const { id_tipo_material } = req.params;
    console.log("Buscando tipo de material con ID:", id_tipo_material); // Agrega esto para depuración

    try {
        const SQL = "SELECT * FROM tipo_materiales WHERE id_tipo_material = $1";
        const result = await pool.query(SQL, [id_tipo_material]); // Cambié el resultado para adaptarlo a tu consulta de PostgreSQL

        if (result.rows.length > 0) {
            return res.status(200).json(result.rows[0]);
        } else {
            return res.status(404).json({ message: "Tipo de material no encontrado" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al buscar un tipo de material", error: error.message });
    }
};


export const crearTipoMaterial = async (req, res) => {
    try {
        const { tipo_elemento, estado, fecha_creacion, fecha_modificacion } = req.body;

        // Asegurarse de que las fechas estén en el formato correcto (yyyy-mm-dd)
        const SQL = "INSERT INTO tipo_materiales (tipo_elemento, estado, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3, $4)";

        // Ejecutar la consulta con los parámetros proporcionados
        const result = await pool.query(SQL, [tipo_elemento, estado, fecha_creacion, fecha_modificacion]);

        // Comprobar si se ha insertado correctamente
        if (result.rowCount > 0) {
            return res.status(200).json({ message: "Tipo de material creado correctamente" });
        } else {
            // Si no se insertó correctamente, devolver un error 500
            return res.status(500).json({ message: "Error al crear un tipo de material" });
        }
    } catch (error) {
        // Captura cualquier error en la consulta o en el servidor
        console.error("Error al crear el tipo de material:", error); // Log para depuración
        return res.status(500).json({ message: "Error al crear un tipo de material", error: error.message });
    }
};


// Actualizar un tipo de material
export const actualizarTipoMaterial = async (req, res) => {
    try {
        const { id_tipo_material } = req.params;  
        const { tipo_elemento, estado, fecha_creacion, fecha_modificacion } = req.body;

        const SQL = "UPDATE tipo_materiales SET tipo_elemento = $1, estado = $2, fecha_creacion = $3, fecha_modificacion = $4 WHERE id_tipo_material = $5";
        const result = await pool.query(SQL, [tipo_elemento, estado, fecha_creacion, fecha_modificacion, id_tipo_material]);

        if (result.rowCount > 0) {
            return res.status(200).json({ message: "Tipo de material actualizado correctamente" });
        } else {
            return res.status(404).json({ message: "Tipo de material no encontrado" });
        }
    } catch (error) {
        console.error('Error al actualizar tipo de material:', error);
        return res.status(500).json({ message: "Error al actualizar un tipo de material", error: error.message });
    }
};


// Eliminar un tipo de material
export const eliminarTipoMaterial = async (req, res) => {
    const { id_tipo_material } = req.params;  
    try {
        const SQL = "DELETE FROM tipo_materiales WHERE id_tipo_material = $1";
        const result = await pool.query(SQL, [id_tipo_material]);
        if (result.rowCount > 0) {
            return res.status(200).json({ message: "Tipo de material eliminado correctamente" });
        } else {
            return res.status(404).json({ message: "Tipo de material no encontrado" });
        }
    } catch (error) {
        console.error('Error al eliminar tipo de material:', error);
        return res.status(500).json({ message: "Error al eliminar un tipo de material", error: error.message });
    }
};
