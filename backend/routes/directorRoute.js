import express from 'express'
import Director from '../models/directorModel.js'

const router = express.Router()

// obtener todos los directores
router.get('/', async (req, res) => {
    try {
        const directores = await Director.find()
        res.status(200).json(directores)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

// obtener directores activos
router.get('/activos', async (req, res) => {
    try {
        const directores = await Director.find({ estado: 'Activo' })
        res.status(200).json(directores)
    } catch (error) {
        console.error("DEBUG GET ACTIVOS ERROR ==>", error.message, error.stack)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

// obtener un director por id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const director = await Director.findById(id)
        if (!director) return res.status(404).json({ error: 'Director no encontrado' })
        res.status(200).json(director)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

// crear un director
router.post('/', async (req, res) => {
    try {
        const newDirector = new Director(req.body)
        const saveDirector = await newDirector.save()
        res.status(201).json({ mensaje: 'Director creado exitosamente', director: saveDirector })
    } catch (error) {
        console.error("DEBUG POST DIRE ERROR ==>", error.message, error.stack)
        res.status(500).json({ error: 'Error del servidor o datos inválidos' })
    }
})

// eliminar un director
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedDirector = await Director.findByIdAndDelete(id)
        if (!deletedDirector) return res.status(404).json({ error: 'Director no pudo ser eliminado' })
        res.status(200).json({ mensaje: 'Director eliminado', director: deletedDirector })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

// actualizar un director
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateDirector = await Director.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateDirector) return res.status(404).json({ mensaje: 'Director no encontrado' })
        res.json(updateDirector)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

export default router
