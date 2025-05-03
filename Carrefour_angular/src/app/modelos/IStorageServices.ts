import IJwtFormat from "./IJwtFormat";
import ICliente from "./interfaces_orm/ICliente";

export default interface IStorageService {
    getJWT: ()=> IJwtFormat | undefined,
    getCodigoVerificacion: ()=> string,
    getDatosCliente: ()=> ICliente | undefined,
    
    setJwt: (tipo:string, valor:string ) => void,
    setCodigoVerificacion: (codigo:string) => void,
    setDatosCliente: (datosCliente: ICliente) => void
}
