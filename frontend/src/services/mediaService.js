import api from '../api/api'

const mediaService = {
  getAll: () => api.get('/peliculas'),
  getById: (id) => api.get(`/peliculas/${id}`),
  create: (data) => api.post('/peliculas', data),
  update: (id, data) => api.put(`/peliculas/${id}`, data),
  delete: (id) => api.delete(`/peliculas/${id}`),

  // Estos traen solo los activos para los selects del formulario
  getGenerosActivos: () => api.get('/generos/activos'),
  getDirectoresActivos: () => api.get('/directores/activos'),
  getProductorasActivas: () => api.get('/productoras/activas'),
  getTipos: () => api.get('/tipos')
}

export default mediaService