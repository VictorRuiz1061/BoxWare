import { pool } from "../conexion/conexion.js";

// Mostrar categorías de materiales
export const mostrarcategorias_elementos = async (req, res) => {
    const sql = 'SELECT * FROM categorias_elementos;';
    try {
        const result = await pool.query(sql);
        return res.status(200).json(result.rows);
    } catch (e) {
        return res.status(500).json('Error del servidor al mostrar las categorías de elementos');
    }
}

// Buscar categoría de material
export const buscarcategorias_elementos = async (req, res) => {
    const { id_categoria_elemento } = req.params;
    try {
        const sql = 'SELECT * FROM categorias_elementos WHERE id_categoria_elemento = $1';
        const result = await pool.query(sql, [id_categoria_elemento]);
        if (result.rowCount > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ status: 404, message: "Categoría de material no encontrada" });
        }
    } catch (e) {
        console.error('Error al buscar la categoría de material:', e);
        return res.status(500).json({ status: 500, message: "Error del servidor al buscar la categoría de material", error: e.message });
    }
}
// Crear categoría de material
export const crearcategorias_elementos = async (req, res) => {
    const { codigo_unpsc, nombre_categoria, fecha_creacion, fecha_modificacion } = req.body;
    try {
        const sql = 'INSERT INTO categorias_elementos (codigo_unpsc, nombre_categoria, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3, $4)';
        const result = await pool.query(sql, [codigo_unpsc, nombre_categoria, fecha_creacion, fecha_modificacion]);
        if (result.rowCount > 0) {
            return res.status(200).json({ status: 200, message: "Categoría de material creada con éxito" });
        } else {
            return res.status(400).json({ status: 400, message: "No se pudo crear la categoría de material" });
        }
    } catch (e) {
        console.error('Error al crear la categoría de material:', e);
        return res.status(500).json({ status: 500, message: "Error del servidor al crear la categoría de material", error: e.message });
    }
}

// Actualizar categoría de material
export const actualizarcategorias_elementos = async (req, res) => {
    const {  id_categoria_elemento} = req.params;
    const { codigo_unpsc, nombre_categoria, fecha_creacion, fecha_modificacion } = req.body;
    try {
        const sql = 'UPDATE categorias_elementos SET codigo_unpsc = $1, nombre_categoria = $2, fecha_creacion = $3, fecha_modificacion = $4 WHERE  id_categoria_elemento= $5';
        const result = await pool.query(sql, [codigo_unpsc, nombre_categoria, fecha_creacion, fecha_modificacion, id_categoria_elemento]);
        if (result.rowCount > 0) {
            return res.status(200).json({ status: 200, message: "Categoría de material actualizada con éxito" });
        } else {
            return res.status(404).json({ status: 404, message: "Categoría de material no encontrada" });
        }
    } catch (e) {
        console.error('Error al actualizar la categoría de material:', e);
        return res.status(500).json({ status: 500, message: "Error del servidor al actualizar la categoría de material", error: e.message });
    }
}

// Eliminar categoría de material
export const eliminarcategorias_elementos = async (req, res) => {
    const {  id_categoria_elemento } = req.params;
    try {
        const sql = 'DELETE FROM categorias_elementos WHERE  id_categoria_elemento = $1';
        const result = await pool.query(sql, [ id_categoria_elemento]);
        if (result.rowCount > 0) {
            return res.status(200).json({ status: 200, message: "Categoría de material eliminada con éxito" });
        } else {
            return res.status(404).json({ status: 404, message: "Categoría de material no encontrada" });
        }
    } catch (e) {
        console.error('Error al eliminar la categoría de material:', e);
        return res.status(500).json({ status: 500, message: "Error del servidor al eliminar la categoría de material", error: e.message });
    }
}
