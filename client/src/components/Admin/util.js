import URL from '../../constants/url';

const fetchData = async (method, path, body) => {
  let data;
  if (method === 'get') {
    data = await fetch(URL.LOCAL_API_SERVER + path);
  } else {
    data = await fetch(URL.LOCAL_API_SERVER + path, {
      method,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
  return data.json();
};

export default fetchData;
