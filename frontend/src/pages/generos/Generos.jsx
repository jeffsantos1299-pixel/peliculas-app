import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import generoService from '../../services/generoService'
import Badge from '../../components/Badge'
import { BotonPrimario, BotonSecundario, BotonEditar, BotonEliminar } from '../../components/Botones'

const Generos = () => {

  // 📦 CAJAS DE ESTADO (useState)
  const [generos, setGeneros] = useState([])        // lista de géneros
  const [loading, setLoading] = useState(true)       // ¿está cargando?
  const [showForm, setShowForm] = useState(false)    // ¿mostrar formulario?
  const [editando, setEditando] = useState(null)     // ¿qué género estamos editando?
  const [form, setForm] = useState({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  })

  // 🚀 CUANDO CARGA LA PÁGINA, trae los géneros
  useEffect(() => {
    cargarGeneros()
  }, [])

  // 📥 FUNCIÓN: trae todos los géneros del backend
  const cargarGeneros = async () => {
    try {
      const res = await generoService.getAll()
      setGeneros(res.data)
    } catch (error) {
  const mensaje = error.response?.data?.message || 'Error al cargar géneros'
      toast.error(mensaje)
    } finally {
      setLoading(false)
    }
  }

  // ✏️ FUNCIÓN: actualiza el formulario cuando el usuario escribe
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 💾 FUNCIÓN: guarda o actualiza un género
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editando) {
        await generoService.update(editando._id, form)
        toast.success('Género actualizado ✅')
      } else {
        await generoService.create(form)
        toast.success('Género creado ✅')
      }
      resetForm()
      cargarGeneros()
    }catch (error) {
  const mensaje = error.response?.data?.message || 'Error al actualizar géneros'
       toast.error(mensaje)
}
  }

  // 📝 FUNCIÓN: carga los datos de un género en el formulario para editarlo
  const handleEditar = (genero) => {
    setEditando(genero)
    setForm({
      nombre: genero.nombre,
      estado: genero.estado,
      descripcion: genero.descripcion || ''
    })
    setShowForm(true)
  }

  // 🗑️ FUNCIÓN: elimina un género
  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este género?')) return
    try {
      await generoService.delete(id)
      toast.success('Género eliminado ✅')
      cargarGeneros()
    }catch (error) {
  const mensaje = error.response?.data?.message || 'Error al eliminar géneros'
      toast.error(mensaje)
}
  }

  // 🔄 FUNCIÓN: limpia el formulario y cierra
  const resetForm = () => {
    setForm({ nombre: '', estado: 'Activo', descripcion: '' })
    setEditando(null)
    setShowForm(false)
  }

  return (
    <div>

      {/* ── ENCABEZADO ── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">🎭 Géneros</h2>
          <p className="text-zinc-400 mt-1">Gestiona los géneros de películas</p>
        </div>
        <BotonPrimario onClick={() => {
          resetForm()
          setShowForm(!showForm)
        }}>
          {showForm ? '✕ Cancelar' : '+ Nuevo Género'}
        </BotonPrimario>
      </div>

      {/* ── FORMULARIO ── */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">
            {editando ? '✏️ Editar Género' : '➕ Nuevo Género'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              {/* Nombre */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Acción"
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg 
                    px-4 py-2.5 text-white text-sm focus:border-red-500 
                    focus:outline-none transition-colors"
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Estado
                </label>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg 
                    px-4 py-2.5 text-white text-sm focus:border-red-500 
                    focus:outline-none transition-colors"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

            </div>

            {/* Descripción */}
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción del género..."
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg 
                  px-4 py-2.5 text-white text-sm focus:border-red-500 
                  focus:outline-none transition-colors resize-none"
              />
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
        ) : generos.length === 0 ? (
          <p className="text-center text-zinc-400 py-12">
            No hay géneros registrados
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Nombre
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Estado
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Descripción
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {generos.map((genero) => (
                <tr
                  key={genero._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{genero.nombre}</td>
                  <td className="px-6 py-4">
                    <Badge estado={genero.estado} />
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {genero.descripcion || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <BotonEditar onClick={() => handleEditar(genero)} />
                      <BotonEliminar onClick={() => handleEliminar(genero._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}

export default Generos