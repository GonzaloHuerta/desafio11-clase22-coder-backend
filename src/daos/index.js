import dotenv from 'dotenv';
import { MensajesDaoFirebase } from './mensajes/MensajesDaoFirebase.js';
import { MensajesDaoMongoDb } from './mensajes/MensajesDaoMongoDb.js';
dotenv.config();

let mensajesDao;

    switch (process.env.DB_NAME) {
        case 'mongoDB':
            console.log('Entra Mongo')
            mensajesDao = new MensajesDaoMongoDb();
            break;
        
        case 'firebase':
            console.log('Entra firebase')
            mensajesDao = new MensajesDaoFirebase();
            break;

        default:
            console.log('default')
            break;
    }

export {mensajesDao}
