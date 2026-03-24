import express from 'express'
import Genero from '../models/generoModel.js'

const router = express.Router()

// obtener todos los generos
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find()
        res.status(200).json(generos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

// obtener generos activos
router.get('/activos', async (req, res) => {
    try {
        const generos = await Genero.find({ estado: 'Activo' })
        res.status(200).json(generos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

// obtener un genero por id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const genero = await Genero.findById(id)
        if (!genero) return res.status(404).json({ error: 'Genero no encontrado' })
        res.status(200).json(genero)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

// crear un genero
router.post('/', async (req, res) => {
    try {
        const newGenero = new Genero(req.body)
        const saveGenero = await newGenero.save()
        res.status(201).json({ mensaje: 'Genero creado exitosamente', genero: saveGenero })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor o datos inválidos' })
    }
})

// eliminar un genero
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedGenero = await Genero.findByIdAndDelete(id)
        if (!deletedGenero) return res.status(404).json({ error: 'Genero no pudo ser eliminado' })
        res.status(200).json({ mensaje: 'Genero eliminado', genero: deletedGenero })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

// actualizar un genero
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateGenero = await Genero.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateGenero) return res.status(404).json({ mensaje: 'Genero no encontrado' })
        res.json(updateGenero)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

export default router
