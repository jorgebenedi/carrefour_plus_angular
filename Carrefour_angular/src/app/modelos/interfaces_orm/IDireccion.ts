export default interface IDireccion {
    calle: string,
    cp: string,
    provincia: { CPRO: string, PRO: string, CCOM: string },
    municipio: { CUN: string, CPRO: string, CMUM: string, DMUN50: string },
    esPrincipal: boolean,
    esFacturacion: boolean
    //.... faltan datosEnvio y datosFacturacion...
}