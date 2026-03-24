import express from 'express'
import Tipo from '../models/tipoModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const tipos = await Tipo.find()
        res.status(200).json(tipos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const tipo = await Tipo.findById(id)
        if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' })
        res.status(200).json(tipo)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newTipo = new Tipo(req.body)
        const saveTipo = await newTipo.save()
        res.status(201).json({ mensaje: 'Tipo creado exitosamente', tipo: saveTipo })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor o datos inválidos' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedTipo = await Tipo.findByIdAndDelete(id)
        if (!deletedTipo) return res.status(404).json({ error: 'Tipo no pudo ser eliminado' })
        res.status(200).json({ mensaje: 'Tipo eliminado', tipo: deletedTipo })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateTipo = await Tipo.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateTipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' })
        res.json(updateTipo)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

export default router
