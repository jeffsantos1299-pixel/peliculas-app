import { Link } from 'react-router-dom'

const Home = () => {
  const modulos = [
    {
      emoji: '🎭',
      nombre: 'Géneros',
      descripcion: 'Gestiona los géneros de películas',
      path: '/generos',
      color: 'hover:border-purple-500'
    },
    {
      emoji: '🎬',
      nombre: 'Directores',
      descripcion: 'Gestiona los directores de las producciones',
      path: '/directores',
      color: 'hover:border-blue-500'
    },
    {
      emoji: '🏢',
      nombre: 'Productoras',
      descripcion: 'Gestiona las productoras como Disney, Warner...',
      path: '/productoras',
      color: 'hover:border-yellow-500'
    },
    {
      emoji: '📋',
      nombre: 'Tipos',
      descripcion: 'Gestiona los tipos: película, serie...',
      path: '/tipos',
      color: 'hover:border-green-500'
    },
    {
      emoji: '🎥',
      nombre: 'Películas y Series',
      descripcion: 'Gestiona todas las producciones',
      path: '/medias',
      color: 'hover:border-red-500'
    },
  ]

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Bienvenido a{' '}
          <span className="text-red-600">PeliculasApp</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Panel de administración — Gestiona todos los módulos desde aquí
        </p>
      </div>

      {/* Tarjetas de módulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulos.map((modulo) => (
          <Link
            to={modulo.path}
            key={modulo.path}
            className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 
              transition-all duration-200 ${modulo.color} hover:scale-105`}
          >
            <div className="text-5xl mb-4">{modulo.emoji}</div>
            <h3 className="text-xl font-bold mb-2">{modulo.nombre}</h3>
            <p className="text-zinc-400 text-sm">{modulo.descripcion}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home