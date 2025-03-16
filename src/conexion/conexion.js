import {createPool} from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config({path:'./env/.env'})

export const pool = createPool({
   host:process.env.DB_HOST,
   user:process.env.DB_USER,
   password:process.env.DB_PASSWORD,
   port:process.env.DB_PORT,
   database:process.env.DB_DATABASE
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa');
        connection.release(); 
    } catch (err) {
        console.error('Error de conexión:', err.message);
    }
})();