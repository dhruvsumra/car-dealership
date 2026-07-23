const API_BASE = '/api';

// Token helper
export const getToken = () => localStorage.getItem('aura_token');
export const setToken = (token) => localStorage.setItem('aura_token', token);
export const removeToken = () => localStorage.removeItem('aura_token');

export const getUser = () => {
  const user = localStorage.getItem('aura_user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => localStorage.setItem('aura_user', JSON.stringify(user));
export const removeUser = () => localStorage.removeItem('aura_user');

// Request helper with headers
async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
}

export const api = {
  // Auth
  register: (name, email, password, role = 'user') =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // Vehicles
  getVehicles: () => request('/vehicles'),

  searchVehicles: (params) => {
    const query = new URLSearchParams(params).toString();
    return request(`/vehicles/search?${query}`);
  },

  createVehicle: (vehicleData) =>
    request('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    }),

  updateVehicle: (id, vehicleData) =>
    request(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    }),

  deleteVehicle: (id) =>
    request(`/vehicles/${id}`, {
      method: 'DELETE',
    }),

  // Inventory
  purchaseVehicle: (id, quantity = 1) =>
    request(`/vehicles/${id}/purchase`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    }),

  restockVehicle: (id, quantity = 1) =>
    request(`/vehicles/${id}/restock`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    }),
};
