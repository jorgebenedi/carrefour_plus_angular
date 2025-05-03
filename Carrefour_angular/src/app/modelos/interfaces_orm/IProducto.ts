export default interface IProducto {
    _id: string,
    nombre: string,
    imagenes: string,
    pathCategoria: string,
    precio: number,
    precioKg: number,
    caracteristicas: string,
    valoraciones: []
}