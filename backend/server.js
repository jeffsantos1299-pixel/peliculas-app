import express from 'express'
import cors from 'cors'
import peliculasRouter from './routes/peliculasRoute.js';
import generoRouter from './routes/generoRoute.js';
import directorRouter from './routes/directorRoute.js';
import productoraRouter from './routes/productoraRoute.js';
import tipoRouter from './routes/tipoRoute.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()
const app = express();

// Midleware
app.use(express.json())
app.use(cors())
app.use('/peliculas', peliculasRouter)
app.use('/generos', generoRouter)
app.use('/directores', directorRouter)
app.use('/productoras', productoraRouter)
app.use('/tipos', tipoRouter)

const PORT = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log('DATABASE MONGO DB CONECTADA')
        app.listen(PORT, () => {
            console.log(`Servidor levantado en http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error conectando a MONGODB Atlas:', error.message)
    })
