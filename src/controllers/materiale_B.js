import { pool } from "../conexion/conexion.js";

//mostar materiales
export const mostrarMateriales = async (req, res) => {
    const sql = 'SELECT * FROM materiales';
    try {
        const [result] = await pool.query(sql);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json('Error del servidor al mostrar los materiales');
    }
}
//buscar materiales
export const buscarMaterial = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM materiales WHERE id = ?';
    try {
        const [result] = await pool.query(sql, [id]);
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({ status: 400, message: "El material no existe" });
        }
    } catch (e) {
        return res.status(500).json('Error del servidor al buscar el material');
    }
}

//crear materiales
export const crearMateriales = async (req, res) => {
    const { 
        fecha_vencimiento, 
        codigo_sena_material, 
        nombre_material, 
        descripcion_material, 
        stock, 
        unidad_medida, 
        producto_perecedero, 
        fecha_creacion, 
        fecha_modificacion, 
        categoria, 
        tipo_material, 
        sitio 
    } = req.body;

    try {
        
        const sql = `INSERT INTO materiales 
            (fecha_vencimiento, codigo_sena_material, nombre_material, descripcion_material, stock, unidad_medida, producto_perecedero, fecha_creacion, fecha_modificacion, categoria, tipo_material, sitio) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [resultado] = await pool.query(sql, [
            fecha_vencimiento, 
            codigo_sena_material, 
            nombre_material, 
            descripcion_material, 
            stock, 
            unidad_medida, 
            producto_perecedero, 
            fecha_creacion, 
            fecha_modificacion, 
            categoria, 
            tipo_material, 
            sitio
        ]);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ status: 200, message: "Material creado correctamente" });
        } else {
            return res.status(400).json({ status: 400, message: "Error al crear el material" });
        }

    } catch (e) {
       
        console.error('Error al crear el material:', e);
        return res.status(500).json({ message: 'Error del servidor al crear el material', error: e.message });
    }
};

//actualizar materiales
export const actualizarMaterial = async (req, res) => {
    const { id } = req.params;
    const { 
        fecha_vencimiento, 
        codigo_sena_material, 
        nombre_material, 
        descripcion_material, 
        stock, 
        unidad_medida, 
        producto_perecedero, 
        fecha_creacion, 
        fecha_modificacion, 
        categoria, 
        tipo_material, 
        sitio 
    } = req.body;

    try {
        const sql = `UPDATE materiales SET 
            fecha_vencimiento = ?, 
            codigo_sena_material = ?, 
            nombre_material = ?, 
            descripcion_material = ?, 
            stock = ?, 
            unidad_medida = ?, 
            producto_perecedero = ?, 
            fecha_creacion = ?, 
            fecha_modificacion = ?, 
            categoria = ?, 
            tipo_material = ?, 
            sitio = ? 
            WHERE id = ?`;

        const [resultado] = await pool.query(sql, [
            fecha_vencimiento, 
            codigo_sena_material, 
            nombre_material, 
            descripcion_material, 
            stock, 
            unidad_medida, 
            producto_perecedero, 
            fecha_creacion, 
            fecha_modificacion, 
            categoria, 
            tipo_material, 
            sitio, 
            id
        ]);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ status: 200, message: "Material actualizado correctamente" });
        } else {
            return res.status(400).json({ status: 400, message: "Error al actualizar el material" });
        }

    } catch (e) {
        console.error('Error al actualizar el material:', e);
        return res.status(500).json({ message: 'Error del servidor al actualizar el material', error: e.message });
    }
};


//eliminar materiales
export const eliminarMaterial = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM materiales WHERE id = ?';
    try {
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ status: 200, message: "Material eliminado correctamente" });
        } else {
            return res.status(400).json({ status: 400, message: "Error al eliminar el material" });
        }
    } catch (e) {
        return res.status(500).json('Error del servidor al eliminar el material');
    }
}