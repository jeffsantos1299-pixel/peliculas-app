import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const links = [
    { path: '/', label: '🏠 Inicio' },
    { path: '/generos', label: '🎭 Géneros' },
    { path: '/directores', label: '🎬 Directores' },
    { path: '/productoras', label: '🏢 Productoras' },
    { path: '/tipos', label: '📋 Tipos' },
    { path: '/medias', label: '🎥 Películas' },
  ]

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        
        {/* Logo */}
        <span className="text-red-600 font-bold text-xl">
          🎬 PeliculasApp
        </span>

        {/* Links */}
        <ul className="flex items-center gap-1">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === link.path
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  )
}

export default Navbar