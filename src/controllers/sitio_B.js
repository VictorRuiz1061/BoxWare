import { pool } from "../conexion/conexion.js";

//mostrar sitios
export const mostrarSitios = async (req, res) => {
    const sql = 'SELECT * FROM sitios';
    try {
        const [result] = await pool.query(sql);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json('Error del servidor al mostrar los sitios');
    }
}
//buscar sitios
export const buscarSitio = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM sitios WHERE id = ?';
    try {
        const [result] = await pool.query(sql, [id]);
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({ status: 400, message: "El sitio no existe" });
        }
    } catch (e) {
        return res.status(500).json('Error del servidor al buscar el sitio');
    }
}

//crear sitios
export const crearSitio = async (req, res) => {
    const{ nombre_sitio, ubicacion, ficha_tecnica , fecha_creacion , fecha_modificacion, persona_encargada, tipo_sitio }= req.body;
    try{
        const sql='INSERT INTO sitios (nombre_sitio, ubicacion, ficha_tecnica , fecha_creacion , fecha_modificacion, persona_encargada, tipo_sitio) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result]= await pool.query(sql,[nombre_sitio, ubicacion, ficha_tecnica , fecha_creacion , fecha_modificacion, persona_encargada, tipo_sitio]);
        if(result.affectedRows>0){
            return res.status(200).json({status:200,message:"El sitio ya se registro en el sistema"});
        }else{
            return res.status(400).json({status:400,message:"No se ha podido registrar el sitio"});
        }

    }catch(e){
        return res.status(500).json('Error del servidor al crear el sitio)');
    }

}

//actualizar sitios
export const actualizarSitio = async (req, res) => {
    const { id } = req.params;
    const { nombre_sitio, ubicacion, ficha_tecnica , fecha_creacion , fecha_modificacion, persona_encargada, tipo_sitio } = req.body;
    const sql = 'UPDATE sitios SET nombre_sitio = ?, ubicacion = ?, ficha_tecnica = ?, fecha_creacion = ?, fecha_modificacion = ?, persona_encargada = ?, tipo_sitio = ? WHERE id = ?';
    try {
        const [result] = await pool.query(sql, [nombre_sitio, ubicacion, ficha_tecnica , fecha_creacion , fecha_modificacion, persona_encargada, tipo_sitio, id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ status: 200, message: "El sitio ha sido actualizado" });
        } else {
            return res.status(400).json({ status: 400, message: "No se ha podido actualizar el sitio" });
        }
    } catch (e) {
        return res.status(500).json('Error del servidor al actualizar el sitio');
    }
}

//eliminar sitios
export const eliminarSitio = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM sitios WHERE id = ?';
    try {
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ status: 200, message: "El sitio ha sido eliminado" });
        } else {
            return res.status(400).json({ status: 400, message: "No se ha podido eliminar el sitio" });
        }
    } catch (e) {
        return res.status(500).json('Error del servidor al eliminar el sitio}');
    }
}