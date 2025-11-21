// services/api.js
const BASE_URL = 'http://SEU_IP_DA_MAQUINA:8000/api';

async function apiGet(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Erro na requisição GET ${path}: ${response.status}`);
  }
  return response.json();
}

async function apiPost(path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Erro na requisição POST ${path}: ${response.status}`);
  }
  return response.json();
}

async function apiPut(path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Erro na requisição PUT ${path}: ${response.status}`);
  }
  return response.json();
}

export { apiGet, apiPost, apiPut };
