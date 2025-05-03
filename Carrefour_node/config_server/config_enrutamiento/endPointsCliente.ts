import express from 'express';
import clienteEndPointController from './endpointsControllers/clienteEndPointController';

//funciones middleware para endpoints zonaCliente definidos con objeto Router de express
const routerCliente=express.Router();

routerCliente.post('/Registro', clienteEndPointController.Registro );
routerCliente.post('/Login', clienteEndPointController.Login );
routerCliente.post('/VerificarCodigo', clienteEndPointController.VerificarCodigo );


export default routerCliente;