import pool from './connection';

const getDataFromDB = async (sql) => {      //이런식으로 db에서 pool.query하는 부분을 util로 빼서 사용하려고 합니다. 
  const [rows] = await pool.query(sql);
  return rows;
};

export default getDataFromDB;
