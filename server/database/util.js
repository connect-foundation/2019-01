import pool from './connection';

const getDataFromDB = async (query) => {
  const [rows] = await pool.query(query);
  return rows;
};

export default getDataFromDB;
