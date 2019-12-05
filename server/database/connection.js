import mysql from 'mysql2';

const db = mysql.createPool({
  host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST_IP : process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const pool = db.promise();

export default pool;
