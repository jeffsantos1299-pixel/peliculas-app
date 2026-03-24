import express from 'express';
import {
    createGenero,
    getAllGenero,
    getOneGenero,
    updateGenero,
    deleteGenero
}from '../controllers/generoController.js';

const router = express.Router();

router.post('/', createGenero);
router.get('/', getAllGenero);
router.get('/:id', getOneGenero);
router.put('/:id', updateGenero);
router.delete('/:id', deleteGenero);

export default router;