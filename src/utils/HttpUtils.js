import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchJson(url) {
  let isOk = true;

  const res = await fetch(`${apiUrl}${url}`).catch((err) => {
    //alert(err.response.data);
    isOk = false;
  });

  if (isOk) {
    const { result } = await res.json();
    return result;
  }
  return null;
}

async function update(url, body) {
  let isOk = true;

  const res = await axios.put(`${apiUrl}${url}`, body).catch((err) => {
    // alert(err.response.data);
    isOk = false;
  });

  if (isOk) {
    const { result } = await res.data;
    return result;
  }
  return null;
}

async function post(url, body) {
  const res = await axios.post(`${apiUrl}${url}`, body);
  const { result } = await res.data;
  return result;
}

export { fetchJson, update, post };
