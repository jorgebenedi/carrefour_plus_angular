"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const direccionSchema = new mongoose_1.default.Schema({
    calle: { type: String, required: true, default: '' },
    cp: { type: String, required: true, match: /^\\d{5}$/, default: '00000' },
    provincia: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Provincia' }, //<--- se podria almacenar el objeto entero...
    municipio: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Municipio' },
    esPrincipal: { type: Boolean, default: false },
    esFacturacion: { type: Boolean, default: false },
    //....faltan datosEnvio y datosFacturacion....
});
exports.default = mongoose_1.default.model("Direccion", direccionSchema, "direcciones");
