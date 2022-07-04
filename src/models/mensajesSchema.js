import mongoose from "mongoose";

export const mensajesSchema = new mongoose.Schema({
    author: {
        id: String,
        nombre: String,
        apellido: String,
        edad: Number,
        alias: String,
        avatar: String,
    },
    fecha: String,
    text: String
});