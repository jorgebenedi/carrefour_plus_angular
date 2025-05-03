//modelo moongose q mapea un documento de la coleccion "clientes" de la bd mongo Carrefour
//en un objeto de clase Cliente <----- para hacer este mapeo, moongose obliga a crear un Schema (se definen como se mapean props. del documento
//a propiedades del objeto, tipos de datos q tienen cada propiedad, restricciones, ...)
import mongoose from "mongoose";

const clienteSchema=new mongoose.Schema(
    {
        nombre: { type: String, required: true, default: '' },
        apellidos: { type: String, required: true, default: '' },
        telefono: { type: String, 
                    required: [true,'telefono obligatorio'],
                    match:[ new RegExp('^\\(?\\+?\\d{2}\\)?\\d{9}$'), 'el telefono no cumple con patron, debe ser +341112233' ] 
                },
        documento: { type: { tipo: String, valor: String}, require: true },
        cuenta: { type: { email: String, password: String }, require: true },
        tarjetaCarrefour: { type: String, required: true, default: '' },
        direcciones: [ { type: mongoose.Schema.Types.ObjectId, ref:'Direccion' }  ],
        pedidos:[ ],
        activada: { type: Boolean, default: false}
    }
)

export default mongoose.model("Cliente", clienteSchema, "clientes");
//                            ---------  -------------- -----------
//                              |            |              |
//                  nombre de la clase    esquema mapeo     nombre coleccion 
// lees un documento de la coleccion clientes -----> construyes objeto clase "Cliente", siguiendo reglas especificadas en el esquema "clienteSchema"