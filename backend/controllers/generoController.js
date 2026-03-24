import mascotasModel from '../models/generoModels.js'
class generoController {
    constructor() {

    }

    async createGenero(req, res) {
        try{
            const data = mascotasModel.createGenero(req.body);
            res.status(201).json(data);
        } catch(e) {
            res.status(500).send(e);
        }

    }

    async updateGenero(req, res) {
        try{
            res.status(201).json({ status: 'update-ok'});
        } catch(e) {
            res.status(500).send(e);
        }

    }
    
    async deleteGenero(req, res) {
        try{
            res.status(201).json({ status: 'delete-ok'});
        } catch(e) {
            res.status(500).send(e);
        }

    }

    async getAllGenero(req, res) {
        try{
            res.status(201).json({ status: 'getall-ok'});
        } catch(e) {
            res.status(500).send(e);
        }
    }
    
    async getOneGenero(req, res) {
        try{
            res.status(201).json({ status: 'getone-ok'});
        } catch(e) {
            res.status(500).send(e);
        }

    }    
}

export default new generoController();