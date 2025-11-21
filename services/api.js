// services/api.js

// =============================
// 1) CONFIGURAÇÃO
// =============================

// Coloque FALSE quando o backend estiver pronto
const USE_MOCK = true;

// Quando USE_MOCK = false, ajuste aqui o IP da máquina do backend:
const BASE_URL = 'http://SEU_IP_DA_MAQUINA:8000/api';


// =============================
// 2) DADOS MOCKADOS
// =============================

let mockLimiarTemp = 28.0;

let mockStatus = {
  temperatura: 29.3,
  umidade: 62.5,
  limiar_temp: mockLimiarTemp,
  timestamp: '2025-11-21 17:30',
  dispositivo: 'esp8266-lab',
};

let mockLogs = [
  {
    id: 1,
    temperatura: 27.8,
    umidade: 60.1,
    timestamp: '2025-11-21 16:50',
    dispositivo: 'esp8266-lab',
  },
  {
    id: 2,
    temperatura: 28.5,
    umidade: 61.0,
    timestamp: '2025-11-21 17:00',
    dispositivo: 'esp8266-lab',
  },
  {
    id: 3,
    temperatura: 29.3,
    umidade: 62.5,
    timestamp: '2025-11-21 17:10',
    dispositivo: 'esp8266-lab',
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
    // Mock para /status
    if (path.startsWith('/status')) {
      return Promise.resolve(mockStatus);
    }

    // Mock para /logs
    if (path.startsWith('/logs')) {
      return Promise.resolve(mockLogs);
    }

    // Mock para /limiar_temp
    if (path.startsWith('/limiar_temp')) {
      return Promise.resolve({ limiar_temp: mockLimiarTemp });
    }
  }

  // Modo real
  return realGet(path);
}

async function apiPost(path, body) {
  if (USE_MOCK) {
    // Se quiser simular criação de logs quando o ESP mandar dados,
    // dá pra brincar aqui depois.
    console.log('[MOCK] POST', path, body);
    return Promise.resolve({ ok: true, ...body });
  }

  return realPost(path, body);
}

async function apiPut(path, body) {
  if (USE_MOCK) {
    console.log('[MOCK] PUT', path, body);

    // Atualiza limiar em memória quando mudar via app
    if (path.startsWith('/limiar_temp')) {
      if (typeof body.limiar_temp === 'number') {
        mockLimiarTemp = body.limiar_temp;
        mockStatus = {
          ...mockStatus,
          limiar_temp: mockLimiarTemp,
        };
      }
      return Promise.resolve({ limiar_temp: mockLimiarTemp });
    }

    return Promise.resolve({ ok: true, ...body });
  }

  return realPut(path, body);
}

export { apiGet, apiPost, apiPut };
