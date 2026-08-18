const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.message || 'Something went wrong. Please try again.')
  return body
}

const authorized = (token) => ({ headers: { Authorization: `Bearer ${token}` } })

export const authApi = {
  register: (details) => request('/auth/register', { method: 'POST', body: JSON.stringify(details) }),
  login: (details) => request('/auth/login', { method: 'POST', body: JSON.stringify(details) }),
}

export const dashboardApi = { get: (token) => request('/dashboard', authorized(token)) }
export const productApi = {
  get: (token) => request('/products', authorized(token)),
  create: (token, product) => request('/products', { method: 'POST', body: JSON.stringify(product), ...authorized(token) }),
  update: (token, id, product) => request(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(product), ...authorized(token) }),
  delete: (token, id) => request(`/products/${id}`, { method: 'DELETE', ...authorized(token) }),
}
export const inventoryApi = { get: (token) => request('/inventory', authorized(token)) }
export const purchaseApi = {
  get: (token) => request('/purchases', authorized(token)),
  create: (token, purchase) => request('/purchases', { method: 'POST', body: JSON.stringify(purchase), ...authorized(token) }),
}
export const repackApi = {
  get: (token) => request('/repack-batches', authorized(token)),
  create: (token, batch) => request('/repack-batches', { method: 'POST', body: JSON.stringify(batch), ...authorized(token) }),
}
export const salesApi = {
  get: (token) => request('/sales', authorized(token)),
  create: (token, sale) => request('/sales', { method: 'POST', body: JSON.stringify(sale), ...authorized(token) }),
}
export const expenseApi = {
  get: (token) => request('/expenses', authorized(token)),
  create: (token, expense) => request('/expenses', { method: 'POST', body: JSON.stringify(expense), ...authorized(token) }),
}
export const alertApi = {
  get: (token) => request('/alerts', authorized(token)),
  resolve: (token, id) => request(`/alerts/${id}/resolve`, { method: 'PATCH', ...authorized(token) }),
}
