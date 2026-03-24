import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
     
    serial: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    imagen_portada: {
        type: String,
        required: true
    },
    anio_estreno: {
        type: Number,
        required: true
    },
    genero_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    director_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
}, {
    timestamps: {
        createdAt: 'fechaCreacion',
        updatedAt: 'fechaActualizacion'
    }
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema);

export default Pelicula;