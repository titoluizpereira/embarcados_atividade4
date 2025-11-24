// services/api.js

const USE_MOCK = true; // deixa true enquanto não estiver usando o backend real

const BASE_URL = 'http://SEU_IP_DA_MAQUINA:8000/api';

// -------------------- MOCKS --------------------

let mockLimiarTemp = 28;

let mockConfig = {
  id: 1,
  temp_min: mockLimiarTemp,
  created_at: '2025-11-23T18:00:00Z',
};

let mockRegisters = [
  {
    id: 1,
    config: 1,
    min_temp_configured: 28,
    temperature: 26.4,
    humidity: 57.8,
    created_at: '2025-11-23T17:20:00Z',
  },
  {
    id: 2,
    config: 1,
    min_temp_configured: 28,
    temperature: 27.1,
    humidity: 59.3,
    created_at: '2025-11-23T17:40:00Z',
  },
  {
    id: 3,
    config: 1,
    min_temp_configured: 28,
    temperature: 28.0,
    humidity: 61.0,
    created_at: '2025-11-23T18:00:00Z',
  },
  {
    id: 4,
    config: 1,
    min_temp_configured: 28,
    temperature: 29.2,
    humidity: 62.4,
    created_at: '2025-11-23T18:20:00Z',
  },
  {
    id: 5,
    config: 1,
    min_temp_configured: 28,
    temperature: 30.0,
    humidity: 63.1,
    created_at: '2025-11-23T18:40:00Z',
  },
];

// -------------------- REAIS (fetch) --------------------

async function realGet(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Erro na requisição GET ${path}: ${response.status}`);
  }
  return response.json();
}

async function realPost(path, body) {
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

async function realPut(path, body) {
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

// -------------------- API COM MOCK --------------------

async function apiGet(path) {
  if (USE_MOCK) {
    // última configuração
    if (path.startsWith('/config')) {
      return Promise.resolve(mockConfig);
    }

    // histórico
    if (path.startsWith('/register')) {
      return Promise.resolve(mockRegisters);
    }
  }

  return realGet(path);
}

async function apiPost(path, body) {
  if (USE_MOCK) {
    console.log('[MOCK] POST', path, body);

    if (path.startsWith('/config')) {
      if (typeof body.temp_min === 'number') {
        mockLimiarTemp = body.temp_min;
        mockConfig = {
          id: mockConfig.id + 1,
          temp_min: mockLimiarTemp,
          created_at: new Date().toISOString(),
        };
      }
      return Promise.resolve(mockConfig);
    }

    if (path.startsWith('/register')) {
      const novo = {
        id: mockRegisters.length + 1,
        config: mockConfig.id,
        min_temp_configured: mockLimiarTemp,
        temperature: body.temperature,
        humidity: body.humidity,
        created_at: new Date().toISOString(),
      };
      mockRegisters.push(novo);
      return Promise.resolve(novo);
    }

    return Promise.resolve({ ok: true, ...body });
  }

  return realPost(path, body);
}

async function apiPut(path, body) {
  if (USE_MOCK) {
    console.log('[MOCK] PUT', path, body);
    return Promise.resolve({ ok: true, ...body });
  }

  return realPut(path, body);
}

export { apiGet, apiPost, apiPut };
