"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tiendaEndPointController_1 = __importDefault(require("./endpointsControllers/tiendaEndPointController"));
//funciones middleware para endpoints zonaCliente definidos con objeto Router de express
const routerTienda = express_1.default.Router();
routerTienda.get('/Categorias', tiendaEndPointController_1.default.Categorias);
routerTienda.get('/Productos', tiendaEndPointController_1.default.Productos);
exports.default = routerTienda;
