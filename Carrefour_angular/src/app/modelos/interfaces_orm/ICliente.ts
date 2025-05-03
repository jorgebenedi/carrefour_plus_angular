import IDireccion from "./IDireccion";

export default interface ICliente {
    nombre: string,
    apellidos: string,
    telefono: string,
    cp?: string,
    tarjetaCarrefour?: string,
    cuenta: { email:string, password?: string},
    activada: Boolean,
    documento: { tipo: string, valor: string },
    direcciones: [ IDireccion ],
    pedidos:[ ]

}