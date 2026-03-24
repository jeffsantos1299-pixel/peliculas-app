import express from 'express'
import Pelicula from '../models/peliculasModel.js'
import Genero from '../models/generoModel.js'
import Director from '../models/directorModel.js'
import Productora from '../models/productoraModel.js'
import Tipo from '../models/tipoModel.js'

const router = express.Router()

// obtener todas las peliculas
router.get('/', async (req, res) => {
   try {
      const peliculas = await Pelicula.find().populate('genero_id director_id productora_id tipo_id')
      res.status(200).json(peliculas)
      console.log('OBTENIENDO TODAS LAS PELICULAS')
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error del servidor' })
   }
})

// obtener una pelicula por id
router.get('/:id', async (req, res) => {
   try {
      const id = req.params.id
      const pelicula = await Pelicula.findById(id).populate('genero_id director_id productora_id tipo_id')
      console.log(pelicula)
      if (!pelicula) return res.status(404).json({ error: 'pelicula no encontrada ' })
      res.status(200).json(pelicula)
      console.log('Obtener una pelicula por id')
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error del servidor' })
   }
})

// crear una pelicula
router.post('/', async (req, res) => {
   try {
      const { genero_id, director_id, productora_id, tipo_id } = req.body

      // Validar Genero
      const genero = await Genero.findById(genero_id)
      if (!genero || genero.estado !== 'Activo') {
         return res.status(400).json({ error: 'El género principal no es válido o está inactivo' })
      }

      // Validar Director
      const director = await Director.findById(director_id)
      if (!director || director.estado !== 'Activo') {
         return res.status(400).json({ error: 'El director principal no es válido o está inactivo' })
      }

      // Validar Productora
      const productoraEncontrada = await Productora.findById(productora_id)
      if (!productoraEncontrada || productoraEncontrada.estado !== 'Activo') {
         return res.status(400).json({ error: 'La productora no es válida o está inactiva' })
      }

      // Validar Tipo
      const tipoEncontrado = await Tipo.findById(tipo_id)
      if (!tipoEncontrado) {
         return res.status(400).json({ error: 'El tipo no es válido' })
      }

      const newPelicula = new Pelicula(req.body)
      const savePelicula = await newPelicula.save()
      res.status(201).json({ mensaje: 'Pelicula creada exitosamente', pelicula: savePelicula })
      console.log('Creando una pelicula')
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error del servidor o datos inválidos' })
   }
})

// eliminar una pelicula
router.delete('/:id', async (req, res) => {
   try {
      const id = req.params.id
      const deletedPelicula = await Pelicula.findByIdAndDelete(id)
      if (!deletedPelicula) return res.status(404).json({ error: 'Pelicula no pudo ser eliminada' })
      res.status(200).json({ mensaje: 'Pelicula eliminada', pelicula: deletedPelicula })
      console.log('ELIMINANDO UNA PELICULA')
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error del servidor' })
   }
})

// actualizar una pelicula
router.put('/:id', async (req, res) => {
   try {
      const id = req.params.id
      const { genero_id, director_id, productora_id, tipo_id } = req.body

      if (genero_id) {
         const genero = await Genero.findById(genero_id)
         if (!genero || genero.estado !== 'Activo') {
            return res.status(400).json({ error: 'El género principal no es válido o está inactivo' })
         }
      }

      if (director_id) {
         const director = await Director.findById(director_id)
         if (!director || director.estado !== 'Activo') {
            return res.status(400).json({ error: 'El director principal no es válido o está inactivo' })
         }
      }

      if (productora_id) {
         const productoraEncontrada = await Productora.findById(productora_id)
         if (!productoraEncontrada || productoraEncontrada.estado !== 'Activo') {
            return res.status(400).json({ error: 'La productora no es válida o está inactiva' })
         }
      }

      if (tipo_id) {
         const tipoEncontrado = await Tipo.findById(tipo_id)
         if (!tipoEncontrado) {
            return res.status(400).json({ error: 'El tipo no es válido' })
         }
      }

      const updateMovie = await Pelicula.findByIdAndUpdate(id, req.body, { new: true })
      if (!updateMovie) return res.status(404).json({ mensaje: 'Pelicula no encontrada' })
      res.json(updateMovie)
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error del servidor' })
   }
})

export default router