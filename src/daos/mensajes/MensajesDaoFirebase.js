import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase.js";

export class MensajesDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('mensajes');
    }
}