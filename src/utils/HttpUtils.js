import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchJson(url) {
  const res = await fetch(`${apiUrl}${url}`);
  const { result } = await res.json();
  return result;
}

async function update(url, body) {
  const res = await axios.put(`${apiUrl}${url}`, body);
  const { result } = await res.data;
  return result;
}

export { fetchJson, update };
