import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchJson(url) {
  const res = await fetch(`${apiUrl}${url}`);
  const { result } = await res.json();
  return result;
}

async function update(url, body) {
  console.log('wtf');
  console.log(body);
  const res = await axios.put(`${apiUrl}${url}`, body);
  //   console.log(res);
  const { result } = await res.data;
  console.log('result from server');
  console.log(result);
  return result;
}

export { fetchJson, update };
