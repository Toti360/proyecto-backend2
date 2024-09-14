import mongoose from "mongoose";
import config from './config/config.js';

mongoose.connect(config.mongodbUri)
    .then(() => console.log("Conexión exitosa a la Base de Datos!!"))
    .catch((error) => console.log("Ups!! ha ocurrido un error", error));