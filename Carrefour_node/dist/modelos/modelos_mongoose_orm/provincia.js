"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const provinciaSchema = new mongoose_1.default.Schema({
    CPRO: String,
    PRO: String,
    CCOM: String
});
exports.default = mongoose_1.default.model("Provincia", provinciaSchema, "provincias");
