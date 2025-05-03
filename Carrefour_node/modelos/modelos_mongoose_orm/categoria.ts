import mongoose from "mongoose";

const categoriaSchema=new mongoose.Schema(
    {
        imagen: String,
        nombreCategoria: String,
        pathCategoria: String,
    }
);

export default mongoose.model("Categoria",categoriaSchema, "categorias")