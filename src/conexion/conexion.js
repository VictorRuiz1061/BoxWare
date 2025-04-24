import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './env/.env' });

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
        const client = await pool.connect();
        console.log('Conexión exitosa');
        client.release();
    } catch (err) {
        console.error('Error de conexión:', err.message);
    }
})();
