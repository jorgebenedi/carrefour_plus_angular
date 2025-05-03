import mongoose from "mongoose";

const provinciaSchema=new mongoose.Schema(
    {
        CPRO: String,
        PRO: String,
        CCOM: String
    }
);

export default mongoose.model("Provincia", provinciaSchema, "provincias")