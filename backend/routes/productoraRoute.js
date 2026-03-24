import express from 'express'
import Productora from '../models/productoraModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const productoras = await Productora.find()
        res.status(200).json(productoras)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})
router.get('/activas', async (req, res) => {
    try {
        const productoras = await Productora.find({ estado: 'Activo' })
        res.status(200).json(productoras)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const productora = await Productora.findById(id)
        if (!productora) return res.status(404).json({ error: 'Productora no encontrada' })
        res.status(200).json(productora)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newProductora = new Productora(req.body)
        const saveProductora = await newProductora.save()
        res.status(201).json({ mensaje: 'Productora creada exitosamente', productora: saveProductora })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor o datos inválidos' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedProductora = await Productora.findByIdAndDelete(id)
        if (!deletedProductora) return res.status(404).json({ error: 'Productora no pudo ser eliminada' })
        res.status(200).json({ mensaje: 'Productora eliminada', productora: deletedProductora })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateProductora = await Productora.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateProductora) return res.status(404).json({ mensaje: 'Productora no encontrada' })
        res.json(updateProductora)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})

export default router
