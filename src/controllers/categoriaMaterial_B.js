import { pool } from "../conexion/conexion.js";

//mostar categoriaMaterial

export const mostrarcategorias_elementos = async (req, res) => {
    const sql = 'SELECT * FROM categorias_elementos';
    try {
        const [result] = await pool.query(sql);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json('Error del servidor al mostrar los categorias_elementos');
    }
}

//buscar categoriaMaterial
export const buscarcategorias_elementos = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM categorias_elementos WHERE id = ?';
    try {
        const [result] = await pool.query(sql, [id]);
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ status: 404, message: "Categoría de material no encontrada" });
        }
    } catch (e) {
        return res.status(500).json({ status: 500, message: "Error del servidor al buscar la categoría de material", error: e.message });
    }
}

//crear categoriaMaterial
export const crearcategorias_elementos = async (req, res) => {
    const { codigo_unpsc_material, nombre_categoria, fecha_creacion, fecha_modificacion } = req.body;
    try {
        const sql = 'INSERT INTO categorias_elementos (codigo_unpsc_material, nombre_categoria, fecha_creacion, fecha_modificacion) VALUES (?,?,?,?)';
        const [result] = await pool.query(sql, [codigo_unpsc_material, nombre_categoria, fecha_creacion, fecha_modificacion]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ status: 200, message: "Categoría de material creada con éxito" });
        }else{
            return res.status(400).json({ status: 400, message: "No se pudo crear la categoría de material" });
        }
    } catch (e) {
        console.error('Error al crear la categoría de material:', e);
        return res.status(500).json({ status: 500, message: "Error del servidor al crear la categoría de material", error: e.message });
    }
}

//actualizar categoriaMaterial
export const actualizarcategorias_elementos = async (req, res) => {
    const { id } = req.params;
    const { codigo_unpsc_material, nombre_categoria, fecha_creacion, fecha_modificacion } = req.body;
    try {
        const sql = 'UPDATE categorias_elementos SET codigo_unpsc_material = ?, nombre_categoria = ?, fecha_creacion = ?, fecha_modificacion = ? WHERE id = ?';
        const [result] = await pool.query(sql, [codigo_unpsc_material, nombre_categoria, fecha_creacion, fecha_modificacion, id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ status: 200, message: "Categoría de material actualizada con éxito" });
        } else {
            return res.status(404).json({ status: 404, message: "Categoría de material no encontrada" });
        }
    } catch (e) {
        console.error('Error al actualizar la categoría de material:', e);
        return res.status(500).json({ status: 500, message: "Error del servidor al actualizar la categoría de material", error: e.message });
    }
}

//eliminar categoriaMaterial
export const eliminarcategorias_elementos = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM categorias_elementos WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ status: 200, message: "Categoría de material eliminada con éxito" });
        } else {
            return res.status(404).json({ status: 404, message: "Categoría de material no encontrada" });
        }
    } catch (e) {
        console.error('Error al eliminar la categoría de material:', e);
        return res.status(500).json({ status: 500, message: "Error del servidor al eliminar la categoría de material", error: e.message });
    }
}