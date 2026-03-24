import api from '../api/api'

const directorService = {
  getAll: () => api.get('/directores'),
  getActivos: () => api.get('/directores/activos'),
  getById: (id) => api.get(`/directores/${id}`),
  create: (data) => api.post('/directores', data),
  update: (id, data) => api.put(`/directores/${id}`, data),
  delete: (id) => api.delete(`/directores/${id}`)
}

export default directorService