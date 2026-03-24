import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import mediaService from '../../services/mediaService'
import { BotonPrimario, BotonSecundario, BotonEditar, BotonEliminar } from '../../components/Botones'

const Medias = () => {

  // 📦 CAJAS DE ESTADO — datos principales
  const [medias, setMedias] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)

  // 📦 CAJAS DE ESTADO — listas para los selects
  // Estas listas se cargan una sola vez cuando abre la página
  const [generos, setGeneros] = useState([])
  const [directores, setDirectores] = useState([])
  const [productoras, setProductoras] = useState([])
  const [tipos, setTipos] = useState([])

  // 📦 CAJA DE ESTADO — formulario
  const [form, setForm] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    imagen_portada: '',
    anio_estreno: '',
    genero_id: '',
    director_id: '',
    productora_id: '',
    tipo_id: ''
  })

  // 🚀 CUANDO CARGA LA PÁGINA trae todo a la vez
  useEffect(() => {
    cargarDatos()
  }, [])

  // 📥 TRAE TODOS LOS DATOS AL MISMO TIEMPO
  // Promise.all hace varias peticiones al backend simultáneamente
  // Es más rápido que hacerlas una por una
  const cargarDatos = async () => {
    try {
      const [
        mediasRes,
        generosRes,
        directoresRes,
        productorasRes,
        tiposRes
      ] = await Promise.all([
        mediaService.getAll(),
        mediaService.getGenerosActivos(),
        mediaService.getDirectoresActivos(),
        mediaService.getProductorasActivas(),
        mediaService.getTipos()
      ])

      setMedias(mediasRes.data)
      setGeneros(generosRes.data)
      setDirectores(directoresRes.data)
      setProductoras(productorasRes.data)
      setTipos(tiposRes.data)
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al cargar datos'
      toast.error(mensaje)
    } finally {
      setLoading(false)
    }
  }

  // ✏️ ACTUALIZA EL FORMULARIO
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 💾 GUARDA O ACTUALIZA
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editando) {
        await mediaService.update(editando._id, form)
        toast.success('Película actualizada ✅')
      } else {
        await mediaService.create(form)
        toast.success('Película creada ✅')
      }
      resetForm()
      cargarDatos()
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al guardar película'
      toast.error(mensaje)
    }
  }

  // 📝 CARGA DATOS PARA EDITAR
  const handleEditar = (media) => {
    setEditando(media)
    setForm({
      serial: media.serial,
      titulo: media.titulo,
      sinopsis: media.sinopsis || '',
      url: media.url,
      imagen_portada: media.imagen_portada || '',
      anio_estreno: media.anio_estreno || '',
      genero_id: typeof media.genero_id === 'object' ? media.genero_id?._id : media.genero_id,
      director_id: typeof media.director_id === 'object' ? media.director_id?._id : media.director_id,
      productora_id: typeof media.productora_id === 'object' ? media.productora_id?._id : media.productora_id,
      tipo_id: typeof media.tipo_id === 'object' ? media.tipo_id?._id : media.tipo_id
    })
    setShowForm(true)
    // Scroll hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 🗑️ ELIMINA UNA PELÍCULA
  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta película?')) return
    try {
      await mediaService.delete(id)
      toast.success('Película eliminada ✅')
      cargarDatos()
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al eliminar película'
      toast.error(mensaje)
    }
  }

  // 🔄 LIMPIA EL FORMULARIO
  const resetForm = () => {
    setForm({
      serial: '',
      titulo: '',
      sinopsis: '',
      url: '',
      imagen_portada: '',
      anio_estreno: '',
      genero_id: '',
      director_id: '',
      productora_id: '',
      tipo_id: ''
    })
    setEditando(null)
    setShowForm(false)
  }

  // 🎨 Estilos reutilizables para los inputs
  const inputClass = `w-full bg-zinc-800 border border-zinc-700 rounded-lg 
    px-4 py-2.5 text-white text-sm focus:border-red-500 
    focus:outline-none transition-colors`

  const labelClass = "block text-sm text-zinc-400 mb-2"

  return (
    <div>

      {/* ── ENCABEZADO ── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">🎥 Películas y Series</h2>
          <p className="text-zinc-400 mt-1">
            Gestiona todas las producciones de la plataforma
          </p>
        </div>
        <BotonPrimario onClick={() => {
          resetForm()
          setShowForm(!showForm)
        }}>
          {showForm ? '✕ Cancelar' : '+ Nueva Película'}
        </BotonPrimario>
      </div>

      {/* ── FORMULARIO ── */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">
            {editando ? '✏️ Editar Película' : '➕ Nueva Película'}
          </h3>
          <form onSubmit={handleSubmit}>

            {/* Fila 1 — Serial y Título */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Serial * (único)</label>
                <input
                  type="text"
                  name="serial"
                  value={form.serial}
                  onChange={handleChange}
                  placeholder="Ej: MOV-001"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Título *</label>
                <input
                  type="text"
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  placeholder="Ej: Interstellar"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Fila 2 — URL y Imagen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>URL de la película * (única)</label>
                <input
                  type="text"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="Ej: https://video.com/pelicula"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Imagen de portada (URL)</label>
                <input
                  type="text"
                  name="imagen_portada"
                  value={form.imagen_portada}
                  onChange={handleChange}
                  placeholder="Ej: https://imagen.com/portada.jpg"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Fila 3 — Los 4 selects */}
            {/* 
              Estos selects son la parte más importante del módulo.
              Solo muestran géneros, directores y productoras ACTIVOS
              tal como lo pide el enunciado.
            */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className={labelClass}>Género * (solo activos)</label>
                <select
                  name="genero_id"
                  value={form.genero_id}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Seleccionar...</option>
                  {generos.map((g) => (
                    <option key={g._id} value={g._id}>{g.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Director * (solo activos)</label>
                <select
                  name="director_id"
                  value={form.director_id}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Seleccionar...</option>
                  {directores.map((d) => (
                    <option key={d._id} value={d._id}>{d.nombres}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Productora * (solo activas)</label>
                <select
                  name="productora_id"
                  value={form.productora_id}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Seleccionar...</option>
                  {productoras.map((p) => (
                    <option key={p._id} value={p._id}>{p.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Tipo *</label>
                <select
                  name="tipo_id"
                  value={form.tipo_id}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Seleccionar...</option>
                  {tipos.map((t) => (
                    <option key={t._id} value={t._id}>{t.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fila 4 — Año y Sinopsis */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className={labelClass}>Año de estreno</label>
                <input
                  type="number"
                  name="anio_estreno"
                  value={form.anio_estreno}
                  onChange={handleChange}
                  placeholder="Ej: 2024"
                  min="1900"
                  max="2100"
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-3">
                <label className={labelClass}>Sinopsis</label>
                <textarea
                  name="sinopsis"
                  value={form.sinopsis}
                  onChange={handleChange}
                  placeholder="Descripción de la película..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <BotonPrimario type="submit">
                {editando ? 'Actualizar' : 'Crear'}
              </BotonPrimario>
              <BotonSecundario onClick={resetForm}>
                Cancelar
              </BotonSecundario>
            </div>

          </form>
        </div>
      )}

      {/* ── TABLA ── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <p className="text-center text-zinc-400 py-12">Cargando...</p>
        ) : medias.length === 0 ? (
          <p className="text-center text-zinc-400 py-12">
            No hay películas registradas
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Portada
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Serial
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Título
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Año
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Género
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Director
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Productora
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Tipo
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {medias.map((media) => (
                  <tr
                    key={media._id}
                    className="border-t border-zinc-800 hover:bg-zinc-800 transition-colors"
                  >
                    {/* Imagen de portada */}
                    <td className="px-6 py-4">
                      {media.imagen_portada ? (
                        <img
                          src={media.imagen_portada}
                          alt={media.titulo}
                          className="w-12 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-12 h-16 bg-zinc-700 rounded-lg flex items-center justify-center text-xl">
                          🎬
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-xs font-mono">
                      {media.serial}
                    </td>
                    <td className="px-6 py-4 font-semibold">{media.titulo}</td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">
                      {media.anio_estreno || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-purple-900 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {media.genero_id?.nombre || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">
                      {media.director_id?.nombres || '—'}
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">
                      {media.productora_id?.nombre || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-900 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {media.tipo_id?.nombre || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <BotonEditar onClick={() => handleEditar(media)} />
                        <BotonEliminar onClick={() => handleEliminar(media._id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}

export default Medias