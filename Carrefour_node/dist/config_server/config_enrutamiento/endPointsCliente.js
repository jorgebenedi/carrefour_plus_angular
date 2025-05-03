"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteEndPointController_1 = __importDefault(require("./endpointsControllers/clienteEndPointController"));
//funciones middleware para endpoints zonaCliente definidos con objeto Router de express
const routerCliente = express_1.default.Router();
routerCliente.post('/Registro', clienteEndPointController_1.default.Registro);
routerCliente.post('/Login', clienteEndPointController_1.default.Login);
routerCliente.post('/VerificarCodigo', clienteEndPointController_1.default.VerificarCodigo);
exports.default = routerCliente;
