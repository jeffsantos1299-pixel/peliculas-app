const Badge = ({ estado }) => {
  const esActivo = estado === 'activo'

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold
      ${esActivo
        ? 'bg-green-900 text-green-400'
        : 'bg-red-900 text-red-400'
      }`}
    >
      {estado}
    </span>
  )
}

export default Badge