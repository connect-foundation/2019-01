import pool from './connection';

const getDataFromDB = async (sql) => {
  const [rows] = await pool.query(sql);
  return rows;
};

export default getDataFromDB;