import URL from '../../constants/url';

const API_SERVER = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_API_SERVER : URL.LOCAL_API_SERVER;

const fetchData = async (method, path, body) => {
  const options = method === 'get' ? { credentials: 'include' } : {
    method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  const data = await fetch(`${API_SERVER}${path}`, options);
  return data.json();
};

export default fetchData;
