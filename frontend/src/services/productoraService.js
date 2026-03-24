import api from '../api/api'

const productoraService = {
  getAll: () => api.get('/productoras'),
  getActivas: () => api.get('/productoras/activas'),
  getById: (id) => api.get(`/productoras/${id}`),
  create: (data) => api.post('/productoras', data),
  update: (id, data) => api.put(`/productoras/${id}`, data),
  delete: (id) => api.delete(`/productoras/${id}`)
}

export default productoraService