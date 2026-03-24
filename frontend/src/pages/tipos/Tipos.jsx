import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import tipoService from '../../services/tipoService'
import { BotonPrimario, BotonSecundario, BotonEditar, BotonEliminar } from '../../components/Botones'

const Tipos = () => {

  // 📦 CAJAS DE ESTADO
  const [tipos, setTipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  })

  // 🚀 CUANDO CARGA LA PÁGINA
  useEffect(() => {
    cargarTipos()
  }, [])

  // 📥 TRAE TODOS LOS TIPOS
  const cargarTipos = async () => {
    try {
      const res = await tipoService.getAll()
      setTipos(res.data)
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al cargar tipos'
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
        await tipoService.update(editando._id, form)
        toast.success('Tipo actualizado ✅')
      } else {
        await tipoService.create(form)
        toast.success('Tipo creado ✅')
      }
      resetForm()
      cargarTipos()
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al guardar tipo'
      toast.error(mensaje)
    }
  }

  // 📝 CARGA DATOS PARA EDITAR
  const handleEditar = (tipo) => {
    setEditando(tipo)
    setForm({
      nombre: tipo.nombre,
      estado: tipo.estado || 'Activo',
      descripcion: tipo.descripcion || ''
    })
    setShowForm(true)
  }

  // 🗑️ ELIMINA UN TIPO
  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este tipo?')) return
    try {
      await tipoService.delete(id)
      toast.success('Tipo eliminado ✅')
      cargarTipos()
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al eliminar tipo'
      toast.error(mensaje)
    }
  }

  // 🔄 LIMPIA EL FORMULARIO
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
          <h2 className="text-3xl font-bold">📋 Tipos</h2>
          <p className="text-zinc-400 mt-1">
            Gestiona los tipos de multimedia: película, serie...
          </p>
        </div>
        <BotonPrimario onClick={() => {
          resetForm()
          setShowForm(!showForm)
        }}>
          {showForm ? '✕ Cancelar' : '+ Nuevo Tipo'}
        </BotonPrimario>
      </div>

      {/* ── FORMULARIO ── */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">
            {editando ? '✏️ Editar Tipo' : '➕ Nuevo Tipo'}
          </h3>
          <form onSubmit={handleSubmit}>

            {/* Nombre */}
            <div className="mb-4">
              <label className="block text-sm text-zinc-400 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Película"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg 
                  px-4 py-2.5 text-white text-sm focus:border-red-500 
                  focus:outline-none transition-colors"
              />
            </div>

            {/* Estado */}
            <div className="mb-4">
              <label className="block text-sm text-zinc-400 mb-2">
                Estado *
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

            {/* Descripción */}
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción del tipo..."
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
        ) : tipos.length === 0 ? (
          <p className="text-center text-zinc-400 py-12">
            No hay tipos registrados
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Nombre
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Descripción
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
              {tipos.map((tipo) => (
                <tr
                  key={tipo._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{tipo.nombre}</td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {tipo.descripcion || '—'}
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {new Date(tipo.fechaCreacion).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <BotonEditar onClick={() => handleEditar(tipo)} />
                      <BotonEliminar onClick={() => handleEliminar(tipo._id)} />
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

export default Tipos