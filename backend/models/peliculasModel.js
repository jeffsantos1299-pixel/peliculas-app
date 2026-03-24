import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
     
    titulo: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    },
    urlPelicula: {
        type: String,
        required: true,
        unique: true
    },
    imagenPortada: {
        type: String,
        required: true
    },
    generoPrincipal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    directorPrincipal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
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