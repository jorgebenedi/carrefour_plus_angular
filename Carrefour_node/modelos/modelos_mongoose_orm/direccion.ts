import mongoose from "mongoose";

const direccionSchema=new mongoose.Schema(
    {
        calle: { type: String, required: true, default: '' },
        cp: { type: String, required: true, match:/^\\d{5}$/, default:'00000' },
        provincia: { type: mongoose.Schema.Types.ObjectId, ref: 'Provincia' }, //<--- se podria almacenar el objeto entero...
        municipio: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipio' },
        esPrincipal: { type: Boolean, default: false },
        esFacturacion: { type: Boolean, default: false },
        //....faltan datosEnvio y datosFacturacion....
    }
);

export default mongoose.model("Direccion", direccionSchema, "direcciones")