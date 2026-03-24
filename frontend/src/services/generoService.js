import api from '../api/api'

const generoService = {
  getAll: () => api.get('/generos'),
  getActivos: () => api.get('/generos/activos'),
  getById: (id) => api.get(`/generos/${id}`),
  create: (data) => api.post('/generos', data),
  update: (id, data) => api.put(`/generos/${id}`, data),
  delete: (id) => api.delete(`/generos/${id}`)
}

export default generoService