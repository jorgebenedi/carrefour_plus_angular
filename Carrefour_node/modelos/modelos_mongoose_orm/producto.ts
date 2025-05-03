import mongoose from 'mongoose';

const prodSchema=new mongoose.Schema(
    {
        nombre: String,
        imagenes: [ String ],
        pathCategoria: String,
        precio: Number,
        precioKg: Number,
        caracteristicas: String,
        valoraciones:[]
    }
);
export default mongoose.model('Producto', prodSchema, 'productos');
