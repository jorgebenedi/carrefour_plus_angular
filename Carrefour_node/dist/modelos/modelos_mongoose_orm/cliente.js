"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//modelo moongose q mapea un documento de la coleccion "clientes" de la bd mongo Carrefour
//en un objeto de clase Cliente <----- para hacer este mapeo, moongose obliga a crear un Schema (se definen como se mapean props. del documento
//a propiedades del objeto, tipos de datos q tienen cada propiedad, restricciones, ...)
const mongoose_1 = __importDefault(require("mongoose"));
const clienteSchema = new mongoose_1.default.Schema({
    nombre: { type: String, required: true, default: '' },
    apellidos: { type: String, required: true, default: '' },
    telefono: { type: String,
        required: [true, 'telefono obligatorio'],
        match: [new RegExp('^\\(?\\+?\\d{2}\\)?\\d{9}$'), 'el telefono no cumple con patron, debe ser +341112233']
    },
    documento: { type: { tipo: String, valor: String }, require: true },
    cuenta: { type: { email: String, password: String }, require: true },
    tarjetaCarrefour: { type: String, required: true, default: '' },
    direcciones: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Direccion' }],
    pedidos: [],
    activada: { type: Boolean, default: false }
});
exports.default = mongoose_1.default.model("Cliente", clienteSchema, "clientes");
//                            ---------  -------------- -----------
//                              |            |              |
//                  nombre de la clase    esquema mapeo     nombre coleccion 
// lees un documento de la coleccion clientes -----> construyes objeto clase "Cliente", siguiendo reglas especificadas en el esquema "clienteSchema"
