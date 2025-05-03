"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const prodSchema = new mongoose_1.default.Schema({
    nombre: String,
    imagenes: [String],
    pathCategoria: String,
    precio: Number,
    precioKg: Number,
    caracteristicas: String,
    valoraciones: []
});
exports.default = mongoose_1.default.model('Producto', prodSchema, 'productos');
