"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const municipioSchema = new mongoose_1.default.Schema({
    CUN: String,
    CPRO: String,
    CMUM: String,
    DMUN50: String
});
exports.default = mongoose_1.default.model("Municipio", municipioSchema, "municipios");
