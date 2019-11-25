import pool from './connection';

const query = async (sql) => {
  const [rows] = await pool.query(sql);
  return rows;
};

export default query;
