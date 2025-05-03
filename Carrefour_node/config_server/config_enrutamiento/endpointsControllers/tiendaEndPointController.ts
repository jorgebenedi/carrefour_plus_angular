import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Categoria from "../../../modelos/modelos_mongoose_orm/categoria";
import Producto from "../../../modelos/modelos_mongoose_orm/producto";

export default {
    Categorias: async (req: Request, res:Response, next:NextFunction)=>{
        try {
            let pathCat=req.query.pathCat;
            console.log('pathCat en url desde angular...', pathCat);

            let _pattern: string='^\\d+$'; //<--- por defecto cats.raices
            if(pathCat !== 'raices') _pattern=`${pathCat}-(\\d+-?)`;
            
            let _regex:RegExp=new RegExp(_pattern);
            await mongoose.connect(process.env.MONGODB_URL!);

            let _cats=await Categoria.find( { pathCategoria: { $regex: _regex } } );
            console.log('categorias recuperadas....', _cats);

            res.status(200).send( { codigo: 0 , mensaje: 'categorias recuperadas ok...', datos: _cats } );

        } catch (error) {
            console.log('error al recuperar categorias....', error);
            res.status(200).send({codigo:1, mensaje: 'error al recuperar categorias: ' + error });
        }
    },
    Productos:  async (req: Request, res:Response, next:NextFunction)=>{
        try {
            let pathCat=req.query.pathCat;
            console.log('pathCat en url desde angular...', pathCat);

            await mongoose.connect(process.env.MONGODB_URL!);

            let _prods=await Producto.find( { pathCategoria: pathCat } );
            console.log('productos recuperados....', _prods);

            res.status(200).send( { codigo: 0 , mensaje: 'productos recuperados ok...', datos: _prods } );

        } catch (error) {
            console.log('error al recuperar productos....', error);
            res.status(200).send({codigo:1, mensaje: 'error al recuperar productos: ' + error });
        }
    },
}