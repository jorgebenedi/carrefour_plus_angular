import express from 'express';
import tiendaEndPointController from './endpointsControllers/tiendaEndPointController';

//funciones middleware para endpoints zonaCliente definidos con objeto Router de express
const routerTienda=express.Router();

routerTienda.get('/Categorias', tiendaEndPointController.Categorias );
routerTienda.get('/Productos', tiendaEndPointController.Productos );


export default routerTienda;