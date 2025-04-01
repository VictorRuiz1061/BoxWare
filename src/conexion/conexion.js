import dotenv from 'dotenv'; 
import pkg from 'pg'; 
dotenv.config({ path: './env/.env' });

const { Pool } = pkg; 

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

async function connect() {
    try {
        await pool.connect();
        console.log('Conexión exitosa');
    } catch (error) {
        console.error('Error en la conexión:', error.message);
    }
}

connect();

