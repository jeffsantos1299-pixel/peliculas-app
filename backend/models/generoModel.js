import mongoose from "mongoose";

const generoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo',
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'fechaCreacion',
        updatedAt: 'fechaActualizacion'
    }
});

const Genero = mongoose.model('Genero', generoSchema);

export default Genero;
