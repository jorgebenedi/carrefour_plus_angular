import 'dotenv/config'; //<---- lee el fichero .env situado en el directorio raiz del proyecto y crea variables de entorno accessibles con process.env
import express,{Express} from 'express';
import configPipeLine from './config_server/config_pipeline';


const app:Express=express();
configPipeLine(app);

app.listen(3003,(error?:Error)=>{
    if(!error) console.log('....servidor web express escuchando en puerto 3003....');
} );


//lanzo conexion contra mongodb y la dejo abierta...asi evito estar abriendo y cerrando todo el rato
        //abro conexion...
// mongoose.connect(process.env.MONGODB_URL! )
//         .then( ()=> console.log(' ... conectado ok a bd mongodb CarrefourDB en puerto 27017...' ) )
//         .catch( (error)=> console.log('ERROR AL INTENTAR CONECTARNOS A MONGODB!!!!!...', error) )
