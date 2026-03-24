import mongoose from "mongoose";

const tipoSchema = new mongoose.Schema({
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

const Tipo = mongoose.model('Tipo', tipoSchema);

export default Tipo;
