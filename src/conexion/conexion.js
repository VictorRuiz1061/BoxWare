import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
   database: process.env.DB_DATABASE
});

(async () => {
    try {
        const client = await pool.connect();  // Obtienes un cliente de la base de datos
        console.log('Conexión exitosa');
        client.release();  // Libera el cliente después de usarlo
    } catch (err) {
        console.error('Error de conexión:', err.message);
    }
})();
