import mongoose from "mongoose";

const productoraSchema = new mongoose.Schema({
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
    slogan: {
        type: String,
        required: false
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

const Productora = mongoose.model('Productora', productoraSchema);

export default Productora;
