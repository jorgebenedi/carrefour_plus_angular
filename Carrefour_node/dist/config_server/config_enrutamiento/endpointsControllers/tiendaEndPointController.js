"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categoria_1 = __importDefault(require("../../../modelos/modelos_mongoose_orm/categoria"));
const producto_1 = __importDefault(require("../../../modelos/modelos_mongoose_orm/producto"));
exports.default = {
    Categorias: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let pathCat = req.query.pathCat;
            console.log('pathCat en url desde angular...', pathCat);
            let _pattern = '^\\d+$'; //<--- por defecto cats.raices
            if (pathCat !== 'raices')
                _pattern = `${pathCat}-(\\d+-?)`;
            let _regex = new RegExp(_pattern);
            yield mongoose_1.default.connect(process.env.MONGODB_URL);
            let _cats = yield categoria_1.default.find({ pathCategoria: { $regex: _regex } });
            console.log('categorias recuperadas....', _cats);
            res.status(200).send({ codigo: 0, mensaje: 'categorias recuperadas ok...', datos: _cats });
        }
        catch (error) {
            console.log('error al recuperar categorias....', error);
            res.status(200).send({ codigo: 1, mensaje: 'error al recuperar categorias: ' + error });
        }
    }),
    Productos: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let pathCat = req.query.pathCat;
            console.log('pathCat en url desde angular...', pathCat);
            yield mongoose_1.default.connect(process.env.MONGODB_URL);
            let _prods = yield producto_1.default.find({ pathCategoria: pathCat });
            console.log('productos recuperados....', _prods);
            res.status(200).send({ codigo: 0, mensaje: 'productos recuperados ok...', datos: _prods });
        }
        catch (error) {
            console.log('error al recuperar productos....', error);
            res.status(200).send({ codigo: 1, mensaje: 'error al recuperar productos: ' + error });
        }
    }),
};
