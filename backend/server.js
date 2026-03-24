import express from 'express'
import router from './routes/peliculasRoute.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()
const app = express();

// Midleware
app.use(express.json())
app.use('/peliculas', router )

const PORT = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log('DATABASE MONGO DB CONECTADA')
    app.listen(PORT, () => {
    console.log(`Servidor levantado en https://localhost:${PORT}`)
})
})
