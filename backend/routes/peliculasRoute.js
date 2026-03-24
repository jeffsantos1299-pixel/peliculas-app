 import express from 'express'
 import Pelicula from '../models/peliculasModel.js'
 const router = express.Router()

 // obtener todas las peliculas
 router.get('/', async (req, res) => {
   try {
      const peliculas = await Pelicula.find()
      res.status(200).json(peliculas)
      console.log('OBTENIENDO TODAS LAS PELICULAS')
   } catch (error) {
      console.error(error)
   }

 })

 // obtener una pelicula por id
 router.get('/:id', async (req, res) => {
   try {
      const id = req.params.id
      const pelicula = await Pelicula.findById(id)
      console.log(pelicula)
      if(!pelicula) return res.status(404).json({ error: 'pelicula no encontrada '})
      res.status(200).json(pelicula)   
      console.log('Obtener una pelicula por id')  
   } catch (error) {
      console.error(error)
      
   }

    
 })

 //crear una nota
 router.post('/', async (req, res) => {
   try {
      const { title, content } = req.body
      const newPelicula = new Pelicula({ title, content })
      const savePelicula = await newPelicula.save()
      res.status(201).json({ mensaje: 'Pelicula creada existosamente', nota: savePelicula })
      console.log('Crendo una pelicula')
   } catch (error) {
      console.error(error)
      
   }

   
    
 })

 //eliminar una nota
 router.delete('/:id', async (req, res) => {
   try {
      const id = req.params.id
      const deletedPelicula = await Pelicula.findByIdAndDelete(id)
      if(!deletedPelicula) return res.status(404).json({error: 'Pelicula no pudo ser eliminado'})
      res.status(200).json(deletedPelicula)
      console.log('ELIMINANDO UNA PELICULA')
   } catch (error) {
      console.error(error)
   }
 })

 router.put('/:id', async (req, res) => {

   try {

      const id = req.params.id
      const updateMovie = await Pelicula.findByIdAndUpdate(id, req.body,{ new: true })
      if(!updateMovie) return res.status(404).json({ mensaje: 'Pelicula no encontrada'})
      res.json(updateMovie)
   } catch (error) {
      console.error(error)
      
   }
 })
 export default router