import { MongoClient } from "mongodb"

class dbClient {
    constructor(){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?appName=cinema`;
        this.client = new MongoClient(queryString);
        this.conectarBD
    }

    async conectarBD() {
        try {
           await this.client.connect();
           this.db = this.client.db('genero')
           console.log("conectado al servidor de base de datos")
        } catch (e) {
            console.log(e);
        }
    }
}

export default new dbClient;