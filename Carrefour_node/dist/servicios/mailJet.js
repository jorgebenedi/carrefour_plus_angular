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
const axios_1 = __importDefault(require("axios"));
exports.default = {
    EnviarEmail: (nombre, apellidos, to, subject, body, htmlbody) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _credsBASE64 = Buffer.from(`${process.env.MJ_APIKEY_PUBLIC}:${process.env.MJ_APIKEY_PRIVATE}`, 'utf-8').toString('base64');
            const _mensaje = {
                "Messages": [
                    {
                        "From": { "Email": "jorgebenediadobe@gmail.com", "Name": "administrador de Carrefour " },
                        "To": [
                            {
                                "Email": to,
                                "Name": apellidos + ", " + nombre
                            }
                        ],
                        "Subject": subject,
                        "TextPart": body,
                        "HTMLPart": htmlbody
                    }
                ]
            };
            /*
                 envio email: https://dev.mailjet.com/email/guides/send-api-v31/ ...
                formato respuesta:
                    {
                    "Messages": [
                        {
                        "Status": "success",
                        "To": [
                            {
                            "Email": "passenger1@mailjet.com",
                            "MessageUUID": "123",
                            "MessageID": 456,
                            "MessageHref": "https://api.mailjet.com/v3/message/456"
                            }
                        ]
                        }
                    ]
                    }
            */
            let _respEnvio = yield (0, axios_1.default)({
                method: 'POST',
                url: 'https://api.mailjet.com/v3.1/send',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${_credsBASE64}`
                },
                data: JSON.stringify(_mensaje)
            });
            console.log('respuesta envio email al cliente...', _respEnvio.data);
            if (_respEnvio.data.Messages[0].Status !== 'success')
                throw new Error('error en envio de mail al usuario: ' + _respEnvio.data);
            return true;
        }
        catch (error) {
            console.log('error envio email', error);
            return false;
        }
    })
};
// const axios = require("axios");
// module.exports = {
//     EnviarEmail: async (to, subject, body, htmlbody) => {
//         try {
//             const _credsBase64 = Buffer
//                 .from(`${process.env.MJ_APIKEY_PUBLIC}:${process.env.MJ_APIKEY_PRIVATE}`)
//                 .toString("base64");
//             const _mensaje = {
//                 "Messages": [ 
//                     {
//                         "From": {
//                             "Email": process.env.EMAIL_ADMIN,
//                             "Name": "Carrefour"
//                         },
//                         "To": [
//                             {
//                                 "Email": to,
//                                 "Name": to
//                             }
//                         ],
//                         "Subject": subject,
//                         "TextPart": body,
//                         "HTMLPart": htmlbody
//                     }
//                 ]
//             };
//             const response = await axios.post(
//                 "https://api.mailjet.com/v3.1/send",
//                 _mensaje,
//                 {
//                     headers: {
//                         Authorization: `Basic ${_credsBase64}`,
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );
//             console.log("✅ Email enviado con éxito:", response.data);
//             return { success: true, response: response.data };
//         } catch (error) {
//             console.error("❌ Error al enviar email:", error.response ? error.response.data : error.message);
//             return { success: false, error: error.message };
//         }
//     }
// };    
