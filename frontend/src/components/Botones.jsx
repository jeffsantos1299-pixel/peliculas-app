const BotonPrimario = ({ children, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 
      rounded-lg font-semibold text-sm transition-all duration-200"
  >
    {children}
  </button>
)

const BotonSecundario = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 
      rounded-lg font-semibold text-sm border border-zinc-700
      transition-all duration-200"
  >
    {children}
  </button>
)

const BotonEditar = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-900 hover:bg-blue-800 text-blue-400 px-4 py-1.5 
      rounded-lg text-sm transition-all duration-200"
  >
    ✏️ Editar
  </button>
)

const BotonEliminar = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-red-900 hover:bg-red-800 text-red-400 px-4 py-1.5 
      rounded-lg text-sm transition-all duration-200"
  >
    🗑️ Eliminar
  </button>
)

export { BotonPrimario, BotonSecundario, BotonEditar, BotonEliminar }