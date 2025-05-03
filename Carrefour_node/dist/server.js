"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); //<---- lee el fichero .env situado en el directorio raiz del proyecto y crea variables de entorno accessibles con process.env
const express_1 = __importDefault(require("express"));
const config_pipeline_1 = __importDefault(require("./config_server/config_pipeline"));
const app = (0, express_1.default)();
(0, config_pipeline_1.default)(app);
app.listen(3003, (error) => {
    if (!error)
        console.log('....servidor web express escuchando en puerto 3003....');
});
//lanzo conexion contra mongodb y la dejo abierta...asi evito estar abriendo y cerrando todo el rato
//abro conexion...
// mongoose.connect(process.env.MONGODB_URL! )
//         .then( ()=> console.log(' ... conectado ok a bd mongodb CarrefourDB en puerto 27017...' ) )
//         .catch( (error)=> console.log('ERROR AL INTENTAR CONECTARNOS A MONGODB!!!!!...', error) )
