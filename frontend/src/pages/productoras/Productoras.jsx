import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import productoraService from '../../services/productoraService'
import Badge from '../../components/Badge'
import { BotonPrimario, BotonSecundario, BotonEditar, BotonEliminar } from '../../components/Botones'

const Productoras = () => {

  // 📦 CAJAS DE ESTADO
  const [productoras, setProductoras] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nombre: '',
    estado: 'Activo',
    slogan: '',
    descripcion: ''
  })

  // 🚀 CUANDO CARGA LA PÁGINA
  useEffect(() => {
    cargarProductoras()
  }, [])

  // 📥 TRAE TODAS LAS PRODUCTORAS
  const cargarProductoras = async () => {
    try {
      const res = await productoraService.getAll()
      setProductoras(res.data)
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al cargar productoras'
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
        await productoraService.update(editando._id, form)
        toast.success('Productora actualizada ✅')
      } else {
        await productoraService.create(form)
        toast.success('Productora creada ✅')
      }
      resetForm()
      cargarProductoras()
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al guardar productora'
      toast.error(mensaje)
    }
  }

  // 📝 CARGA DATOS PARA EDITAR
  const handleEditar = (productora) => {
    setEditando(productora)
    setForm({
      nombre: productora.nombre,
      estado: productora.estado,
      slogan: productora.slogan || '',
      descripcion: productora.descripcion || ''
    })
    setShowForm(true)
  }

  // 🗑️ ELIMINA UNA PRODUCTORA
  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta productora?')) return
    try {
      await productoraService.delete(id)
      toast.success('Productora eliminada ✅')
      cargarProductoras()
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al eliminar productora'
      toast.error(mensaje)
    }
  }

  // 🔄 LIMPIA EL FORMULARIO
  const resetForm = () => {
    setForm({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' })
    setEditando(null)
    setShowForm(false)
  }

  return (
    <div>

      {/* ── ENCABEZADO ── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">🏢 Productoras</h2>
          <p className="text-zinc-400 mt-1">Gestiona las productoras como Disney, Warner...</p>
        </div>
        <BotonPrimario onClick={() => {
          resetForm()
          setShowForm(!showForm)
        }}>
          {showForm ? '✕ Cancelar' : '+ Nueva Productora'}
        </BotonPrimario>
      </div>

      {/* ── FORMULARIO ── */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">
            {editando ? '✏️ Editar Productora' : '➕ Nueva Productora'}
          </h3>
          <form onSubmit={handleSubmit}>

            {/* Fila 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Warner Bros"
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg 
                    px-4 py-2.5 text-white text-sm focus:border-red-500 
                    focus:outline-none transition-colors"
                />
              </div>
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

            {/* Fila 2 */}
            <div className="mb-4">
              <label className="block text-sm text-zinc-400 mb-2">
                Slogan
              </label>
              <input
                type="text"
                name="slogan"
                value={form.slogan}
                onChange={handleChange}
                placeholder="Ej: The stuff that dreams are made of"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg 
                  px-4 py-2.5 text-white text-sm focus:border-red-500 
                  focus:outline-none transition-colors"
              />
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
                placeholder="Descripción de la productora..."
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
        ) : productoras.length === 0 ? (
          <p className="text-center text-zinc-400 py-12">
            No hay productoras registradas
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Nombre
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-400 uppercase">
                  Slogan
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
              {productoras.map((productora) => (
                <tr
                  key={productora._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{productora.nombre}</td>
                  <td className="px-6 py-4 text-zinc-400 text-sm italic">
                    {productora.slogan || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <Badge estado={productora.estado} />
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {productora.descripcion || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <BotonEditar onClick={() => handleEditar(productora)} />
                      <BotonEliminar onClick={() => handleEliminar(productora._id)} />
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

export default Productoras