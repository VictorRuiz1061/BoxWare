import { pool } from "../conexion/conexion.js";

// Mostrar materiales
export const mostrarMateriales = async (req, res) => {
    const sql = 'SELECT * FROM materiales';
    try {
        const result = await pool.query(sql);
        return res.status(200).json(result.rows); // Usamos result.rows en lugar de result
    } catch (e) {
        console.error('Error al mostrar materiales:', e);
        return res.status(500).json('Error del servidor al mostrar los materiales');
    }
};

// Buscar material
export const buscarMaterial = async (req, res) => {
    const { id_material} = req.params;
    const sql = 'SELECT * FROM materiales WHERE id_material= $1';
    try {
        const result = await pool.query(sql, [id_material]);
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(400).json({ status: 400, message: "El material no existe" });
        }
    } catch (e) {
        console.error('Error al buscar material:', e);
        return res.status(500).json('Error del servidor al buscar el material');
    }
};

// Crear material
export const crearMateriales = async (req, res) => {
    const { 
        codigo_sena, 
        nombre_material, 
        descripcion_material, 
        stock, 
        unidad_medida, 
        fecha_vencimiento, 
        producto_perecedero, 
        fecha_creacion, 
        fecha_modificacion, 
        categoria_id, 
        tipo_material_id, 
        sitio_id 
    } = req.body;

    try {
        const sql = `INSERT INTO materiales 
            (codigo_sena, nombre_material, descripcion_material, stock, unidad_medida, fecha_vencimiento, producto_perecedero, fecha_creacion, fecha_modificacion, categoria_id, tipo_material_id, sitio_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id_material`;

        const result = await pool.query(sql, [
            codigo_sena, 
            nombre_material, 
            descripcion_material, 
            stock, 
            unidad_medida, 
            fecha_vencimiento, 
            producto_perecedero, 
            fecha_creacion, 
            fecha_modificacion, 
            categoria_id, 
            tipo_material_id, 
            sitio_id
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({ status: 200, message: "Material creado correctamente", id: result.rows[0].id });
        } else {
            return res.status(400).json({ status: 400, message: "Error al crear el material" });
        }
    } catch (e) {
        console.error('Error al crear material:', e);
        return res.status(500).json({ message: 'Error del servidor al crear el material', error: e.message });
    }
};

// Actualizar material
export const actualizarMaterial = async (req, res) => {
    const { id_material } = req.params;
    const { 
        codigo_sena, 
        nombre_material, 
        descripcion_material, 
        stock, 
        unidad_medida, 
        fecha_vencimiento, 
        producto_perecedero, 
        fecha_creacion, 
        fecha_modificacion, 
        categoria_id, 
        tipo_material_id, 
        sitio_id 
    } = req.body;

    try {
        const sql = `UPDATE materiales SET 
            codigo_sena = $1, 
            nombre_material = $2, 
            descripcion_material = $3, 
            stock = $4, 
            unidad_medida = $5, 
            fecha_vencimiento = $6, 
            producto_perecedero = $7, 
            fecha_creacion = $8, 
            fecha_modificacion = $9, 
            categoria_id = $10, 
            tipo_material_id = $11, 
            sitio_id = $12 
            WHERE id_material = $13 RETURNING id_material`;

        const result = await pool.query(sql, [
            codigo_sena, 
            nombre_material, 
            descripcion_material, 
            stock, 
            unidad_medida, 
            fecha_vencimiento, 
            producto_perecedero, 
            fecha_creacion, 
            fecha_modificacion, 
            categoria_id, 
            tipo_material_id, 
            sitio_id, 
            id_material
        ]);

        if (result.rowCount > 0) {
            return res.status(200).json({ status: 200, message: "Material actualizado correctamente" });
        } else {
            return res.status(400).json({ status: 400, message: "Error al actualizar el material" });
        }
    } catch (e) {
        console.error('Error al actualizar material:', e);
        return res.status(500).json({ message: 'Error del servidor al actualizar el material', error: e.message });
    }
};

// Eliminar material
export const eliminarMaterial = async (req, res) => {
    const { id_material} = req.params;
    const sql = 'DELETE FROM materiales WHERE id_material = $1';
    try {
        const result = await pool.query(sql, [id_material]);
        if (result.rowCount > 0) {
            return res.status(200).json({ status: 200, message: "Material eliminado correctamente" });
        } else {
            return res.status(400).json({ status: 400, message: "Error al eliminar el material" });
        }
    } catch (e) {
        console.error('Error al eliminar material:', e);
        return res.status(500).json('Error del servidor al eliminar el material');
    }
};
