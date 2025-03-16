import { pool } from "../conexion/conexion.js";

//mostrar todos los tipos de material
export const mostrarTipoMaterial = async (req, res) => {
    const sql = 'SELECT * FROM tipo_materiales';
    try {
        const [result] = await pool.query(sql);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json('Error del servidor al mostrar los tipo_materiales');
    }
}

    //buscar un tipo de material
export const buscarTipoMaterial = async (req, res) => {
    
    const id = req.params.id;
    try {
        const SQL = "SELECT * FROM tipo_materiales WHERE id = ?";
        const [result] = await pool.query(SQL, [id]);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        }else{
            return res.status(404).json({ message: "Tipo de material no encontrado",  });
        }
    }catch (error) {
        return res.status(500).json({  message: "Error al buscar un tipo de material", error: error.message, });
    }
}

//crear un tipo de material
export const crearTipoMaterial = async (req, res) => {
    try {
        const {tipo_elemento,	estado	,fecha_creacion	,fecha_modificacion}= req.body;
        const SQL = "INSERT INTO tipo_materiales (tipo_elemento,estado	,fecha_creacion	,fecha_modificacion) VALUES (?, ?, ?, ?)";
        const [result] = await pool.query(SQL, [tipo_elemento,	estado	,fecha_creacion	,fecha_modificacion]);
        if (result.affectedRows>0) {
            res.status(200).json({ message: "Tipo de material creado correctamente",  });
        }else{
            res.status(500).json({ message: "Error al crear un tipo de material", });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al crear un tipo de material", error: error.message, });
    }
}

export const actualizarTipoMaterial = async (req, res) => {
    try {
        const id = req.params.id;
        const { tipo_elemento, estado, fecha_creacion, fecha_modificacion } = req.body;

        const SQL = "UPDATE tipo_materiales SET tipo_elemento = ?, estado = ?, fecha_creacion = ?, fecha_modificacion = ? WHERE id = ?";
        const [result] = await pool.query(SQL, [tipo_elemento, estado, fecha_creacion, fecha_modificacion, id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({message: "Tipo de material actualizado correctamente",});
        } else {
            
            return res.status(404).json({  message: "Tipo de material no encontrado", });
        }
    } catch (error) {
        
        console.error('Error al actualizar tipo de material:', error);
        return res.status(500).json({ message: "Error al actualizar un tipo de material", error: error.message, });
    }
};


//eliminar un tipo de material
export const eliminarTipoMaterial = async (req, res) => {
    const id = req.params.id;
    try {
        const SQL = "DELETE FROM tipo_materiales WHERE id = ?";
        const [result] = await pool.query(SQL, [id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({message: "Tipo de material eliminado correctamente",});
        } else {
            
            return res.status(404).json({ message: "Tipo de material no encontrado",});
        }
    } catch (error) {
        
        return res.status(500).json({ message: "Error al eliminar un tipo de material",error: error.message,});
    }
};


