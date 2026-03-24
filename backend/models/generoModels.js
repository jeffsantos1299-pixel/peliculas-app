import dbClient from "../config/dbClient";

class generoModelo {
    async createGenero(genero) {
        const colGenero = dbClient.db.collection('genero');
        await colGenero.insertOne(genero)
    }
}