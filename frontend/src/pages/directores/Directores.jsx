import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import directorService from '../../services/directorService'
import Badge from '../../components/Badge'
import { BotonPrimario, BotonSecundario, BotonEditar, BotonEliminar } from '../../components/Botones'

const Directores = () => {

  // 📦 CAJAS DE ESTADO
  const [directores, setDirectores] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nombres: '',
    estado: 'Activo'
  })

  // 🚀 CUANDO CARGA LA PÁGINA
  useEffect(() => {
    cargarDirectores()
  }, [])

  // 📥 TRAE TODOS LOS DIRECTORES
  const cargarDirectores = async () => {
    try {
      const res = await directorService.getAll()
      setDirectores(res.data)
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al cargar directores'
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
        await directorService.update(editando._id, form)
        toast.success('Director actualizado ✅')
      } else {
        await directorService.create(form)
        toast.success('Director creado ✅')
      }
      resetForm()
      cargarDirectores()
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al guardar director'
      toast.error(mensaje)
    }
  }

  // 📝 CARGA DATOS PARA EDITAR
  const handleEditar = (director) => {
    setEditando(director)
    setForm({
      nombres: director.nombres,
      estado: director.estado
    })
    setShowForm(true)
  }

  // 🗑️ ELIMINA UN DIRECTOR
  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este director?')) return
    try {
      await directorService.delete(id)
      toast.success('Director eliminado ✅')
      cargarDirectores()
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al eliminar director'
      toast.error(mensaje)
    }
  }

  // 🔄 LIMPIA EL FORMULARIO
  const resetForm = () => {
    setForm({ nombres: '', estado: 'Activo' })
    setEditando(null)
    setShowForm(false)
  }

  return (
    <div>

      {/* ── ENCABEZADO ── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">🎬 Directores</h2>
          <p className="text-zinc-400 mt-1">Gestiona los directores de las producciones</p>
        </div>
        <BotonPrimario onClick={() => {
          resetForm()
          setShowForm(!showForm)
        }}>
          {showForm ? '✕ Cancelar' : '+ Nuevo Director'}
        </BotonPrimario>
      </div>

      {/* ── FORMULARIO ── */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">
            {editando ? '✏️ Editar Director' : '➕ Nuevo Director'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

              {/* Nombres */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Nombres *
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={form.nombres}
                  onChange={handleChange}
                  placeholder="Ej: Christopher Nolan"
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
        ) : directores.length === 0 ? (
          <p className="text-center text-zinc-400 py-12">
            No hay directores registrados
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Nombres
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Estado
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Fecha Creación
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {directores.map((director) => (
                <tr
                  key={director._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{director.nombres}</td>
                  <td className="px-6 py-4">
                    <Badge estado={director.estado} />
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {new Date(director.fechaCreacion).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <BotonEditar onClick={() => handleEditar(director)} />
                      <BotonEliminar onClick={() => handleEliminar(director._id)} />
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

export default Directores