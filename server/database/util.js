import pool from './connection';

const query = async (sql) => {
  const [rows] = await pool.query(sql);
  return rows;
};

const preparedStatement = async (sql, ...args) => {
  const [rows] = await pool.query(sql, args);
  return rows;
};

export { query, preparedStatement };
