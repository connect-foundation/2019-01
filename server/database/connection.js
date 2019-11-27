import mysql from 'mysql2';

const LOCALHOST = '127.0.0.1';

const db = mysql.createPool({
  host: process.env.NODE_ENV === 'production' ? LOCALHOST : process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const pool = db.promise();

export default pool;
