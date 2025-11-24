// services/api.js

// =============================
// 1) CONFIGURAÇÃO
// =============================

// Enquanto estiver sem backend real:
const USE_MOCK = true;

// Quando o backend estiver pronto, coloque USE_MOCK = false
// e ajuste o IP da máquina:
const BASE_URL = 'http://SEU_IP_DA_MAQUINA:8000/api';


// =============================
// 2) DADOS MOCKADOS
// =============================

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
    temperature: 27,
    humidity: 60,
    created_at: '2025-11-23T17:40:00Z',
  },
  {
    id: 2,
    config: 1,
    min_temp_configured: 28,
    temperature: 28,
    humidity: 61,
    created_at: '2025-11-23T17:50:00Z',
  },
  {
    id: 3,
    config: 1,
    min_temp_configured: 28,
    temperature: 29,
    humidity: 62,
    created_at: '2025-11-23T18:00:00Z',
  },
];


// =============================
// 3) FUNÇÕES REAIS (fetch)
// =============================

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


// =============================
// 4) API COM SUPORTE A MOCK
// =============================

async function apiGet(path) {
  if (USE_MOCK) {
    // Última configuração
    if (path.startsWith('/config')) {
      return Promise.resolve(mockConfig);
    }

    // Lista de registros
    if (path.startsWith('/register')) {
      // se quiser um dia tratar ?limit, dá pra olhar path.includes('limit=')
      return Promise.resolve(mockRegisters);
    }
  }

  // Modo real
  return realGet(path);
}

async function apiPost(path, body) {
  if (USE_MOCK) {
    console.log('[MOCK] POST', path, body);

    // Criar nova config
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

    // Criar novo registro
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
    // Hoje não precisamos de PUT nos mocks, mas deixo aqui
    return Promise.resolve({ ok: true, ...body });
  }

  return realPut(path, body);
}

export { apiGet, apiPost, apiPut };
