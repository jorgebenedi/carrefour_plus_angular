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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cliente_1 = __importDefault(require("../../../modelos/modelos_mongoose_orm/cliente"));
const mailJet_1 = __importDefault(require("../../../servicios/mailJet"));
exports.default = {
    Registro: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('has mandado estos datos desde el servicio de angular para el REGISTRO....', req.body);
            //----acceder a mongo atraves de mongoose, crear objeto clase modelo Cliente mongoose y almacenarlo en mongodb...-----
            const { nombre, apellidos, telefono, email, password, tipoDocumento, dninif, cp } = req.body;
            console.log('variable conexion mongdob...', process.env.MONGODB_URL);
            yield mongoose_1.default.connect(process.env.MONGODB_URL);
            let _nuevoCliente = yield (new cliente_1.default({
                nombre,
                apellidos,
                telefono,
                cuenta: { email, password: bcrypt_1.default.hashSync(password, 10) },
                documento: { tipo: tipoDocumento, valor: dninif },
                tarjetaCarrefour: new Date(Date.now()).getTime(), //<---- asi uso el numero de tarjeta para saber cuando se registro el usuairo (fecha en ms) 
                direcciones: [],
                pedidos: [],
                activada: false
            }))
                .save(); //<---- metodo de objetos Model de mongoose, es como hacer un .insertOne() en mongodb directamente
            console.log('cliente insertardo en coleccion clientes de mongodb....', _nuevoCliente);
            // 2º ---- generacion de codigo aleatorio de 6 caracteres, generaion JWT de comprobacion y envio del mismo al email del usuario....
            const _code = crypto.randomUUID().substring(0, 6);
            const _jwt = jsonwebtoken_1.default.sign({ email, codigo: _code }, process.env.JWT_SECRET, { issuer: 'http://localhost:3003', expiresIn: '10min' });
            const _mailTemplate = `
                <div>
                    <div style="display:flex; justify-content: center; align-items: center;">
                        <img src='https://www.carrefour.es/dist/rendering/home-front/imagotipo_color_cms.svg?e1f00957ccb57e68f67e134c5a97fccc' alt="Carrefour.es">                    
                    </div>
                    <p>Para finalizar con la creacion de tu cuenta Carrefour, introduce el codigo que te indicamos:</p>
                    <h3><strong>${_code}</strong></h3>
                    <div style="background-color: cyan">
                        <h4>¿Por que te pedimos verificar tu correo electronico?</h4>
                        <p><small>Nos preocupamos por la seguridad de tus datos</small></p>
                        <ul>
                            <li>Podras recuoperar tu cuenta de forma segura en el futuro</li>
                            <li>Para que puedas aprovechar al maximo las ventajas de El Club Carrefour con tu tarjeta: ${_nuevoCliente.tarjetaCarrefour}</li>
                        </ul>
                    </div>

                    <br>
                    
                    <div>
                        <h4><strong>Dispones de 10 minutos</strong></h4>
                        <p>Si tienes problemas con tu cuenta o crees que alguien intenta acceder a ella, contacta con nuestro equipo de atencion al cliente.</p>
                        <br>
                        <p>Atentamente, <br>Centro de Atencion al Cliente Carrefour</p>
                    </div>
                </div>
            `;
            yield mailJet_1.default.EnviarEmail(nombre, apellidos, email, 'Verifica tu cuenta mandando codigo a Carrefour', 'Para finalizar con la creacion de tu cuenta Carrefour, introduce el codigo que te indicamos', _mailTemplate);
            const clienteLimpio = _nuevoCliente.toObject();
            // Limpia la contraseña de cuenta si existe
            if (clienteLimpio.cuenta) {
                delete clienteLimpio.cuenta.password;
            }
            //---------------------------------------------------------------------------------------
            res.status(200).send({
                codigo: 0,
                mensaje: 'Registro ok, envio de codigo de verificacion',
                datos: {
                    codigo: _code,
                    jwtVerificacion: _jwt,
                    datosCliente: clienteLimpio
                }
            });
        }
        catch (error) {
            console.log('error en registro....', error);
            res.status(200).send({ codigo: 1, mensaje: 'error en registro...' + error });
        }
    }),
    Login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('estas en endpoing /api/zonaCliente/Login ... y los datos que hay en el body son: ', req.body);
            const { email, password } = req.body;
            yield mongoose_1.default.connect(process.env.MONGODB_URL);
            let _cliente = yield cliente_1.default.findOne({ 'cuenta.email': email });
            if (!_cliente)
                throw new Error('no existe ningun cliente con ese email');
            if (!bcrypt_1.default.compareSync(password, _cliente.cuenta.password))
                throw new Error('password invalida');
            // ---- generacion de codigo aleatorio de 6 caracteres, generaion JWT de comprobacion y envio del mismo al email del usuario....
            const _code = crypto.randomUUID().substring(0, 6);
            const _jwt = jsonwebtoken_1.default.sign({ email, codigo: _code }, process.env.JWT_SECRET, { issuer: 'http://localhost:3003', expiresIn: '10min' });
            const _mailTemplate = `
                <div>
                    <div style="display:flex; justify-content: center; align-items: center;">
                        <img src='https://www.carrefour.es/dist/rendering/home-front/imagotipo_color_cms.svg?e1f00957ccb57e68f67e134c5a97fccc' alt="Carrefour.es">                    
                    </div>
                    <p>Introduce el codigo que te indicamos para saber que eres realmente tu dentro de Carrefour:</p>
                    <h3><strong>${_code}</strong></h3>
                    <div style="background-color: cyan">
                        <h4>¿Por que te pedimos verificar tu correo electronico?</h4>
                        <p><small>Nos preocupamos por la seguridad de tus datos</small></p>
                        <ul>
                            <li>Podras recuoperar tu cuenta de forma segura en el futuro</li>
                            <li>Para que puedas aprovechar al maximo las ventajas de El Club Carrefour con tu tarjeta: ${_cliente.tarjetaCarrefour}</li>
                        </ul>
                    </div>

                    <br>
                    
                    <div>
                        <h4><strong>Dispones de 10 minutos</strong></h4>
                        <p>Si tienes problemas con tu cuenta o crees que alguien intenta acceder a ella, contacta con nuestro equipo de atencion al cliente.</p>
                        <br>
                        <p>Atentamente, <br>Centro de Atencion al Cliente Carrefour</p>
                    </div>
                </div>
            `;
            //await miMailJetService.EnviarEmail(_cliente.nombre, _cliente.apellidos, email, 'Verifica tu cuenta mandando codigo a Carrefour', 'Verifica tu cuenta mandando codigo a Carrefour: introduce el codigo que te indicamos',_mailTemplate);
            //---------------------------------------------------------------------------------------
            res.status(200).send({ codigo: 0, mensaje: 'Login ok, envio de codigo de verificacion', datos: { codigo: _code, jwtVerificacion: _jwt, datosCliente: Object.assign(Object.assign({}, _cliente), { 'cuenta.password': '' }) } });
        }
        catch (error) {
            console.log('error en login: ', error);
            res.status(200).send({ codigo: 1, mensaje: 'Error en Login...emial o password invalidos' });
        }
    }),
    VerificarCodigo: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('has mandado estos datos desde el servicio de angular para verificar CODIGO en login o reigstro....', req.body);
            // 1º verificamos que el token se valido y firamdo por el server...
            // 2º comprobamos que claims del jwt coinciden con emai y codigo mandado con datos formulario...
            //3º si todo ok, activamos cuenta en datos cliente si estamos en registro, si estamos en login devolvemos datos cliente...
            res.status(200).send({ codigo: 0, mensaje: 'verificacion de codigo OK!!!!', datos: { datosCliente: {}, accessToken: '', refreshToken: '' } });
        }
        catch (error) {
            console.log('error en loginj....', error);
            res.status(200).send({ codigo: 1, mensaje: 'error en login...' + error });
        }
    }),
};
// k3jkjhjn"HN --> puim@gmail.com
