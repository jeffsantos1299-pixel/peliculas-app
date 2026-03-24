import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Generos from './pages/generos/Generos'
import Directores from './pages/directores/Directores'
import Productoras from './pages/productoras/Productoras'
import Tipos from './pages/tipos/Tipos'
import Medias from './pages/medias/Medias'


const App = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generos" element={<Generos />} />
          <Route path="/directores" element={<Directores />} />
          <Route path="/productoras" element={<Productoras />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/medias" element={<Medias />} />
        </Routes>
      </main>
    </div>
  )
}

export default App