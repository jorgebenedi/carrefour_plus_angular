import mongoose from "mongoose";

const municipioSchema=new mongoose.Schema(
    {
        CUN: String,
        CPRO: String,
        CMUM: String,
        DMUN50: String
    }
);

export default mongoose.model("Municipio", municipioSchema, "municipios")