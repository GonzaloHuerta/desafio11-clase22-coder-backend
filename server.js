import express from 'express';
import http from 'http'
import {Server as ioServer} from 'socket.io';
import path from 'path';
import {mensajesDao as api} from './src/daos/index.js';
import {fileURLToPath} from 'url';
import { inspect } from 'util';
import { normalize, schema, denormalize } from 'normalizr';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = http.createServer(app);

const io = new ioServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mensajes = await api.getAll();
const productos = [];

console.log("Mensajes: ", mensajes);

//console.log(inspect(chatSinNormalizar, { depth: null }));

const chat = {
    id: '2022',
    nombre: 'Centro de mensajes',
    mensajes: mensajes
}

const authorsSchema = new schema.Entity('authors');

const mensajeSchema = new schema.Entity('mensajes',{
    author: authorsSchema, 
})

const chatSchema = new schema.Entity('chats',{
    mensajes: [mensajeSchema]
})

const chatNormalizado = normalize(chat, chatSchema);

console.log(inspect(chatNormalizado, false, 12, true));


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/views/index.html'));
})

app.get('/api/productos', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/views/tabla-productos.html'));
})

io.on('connection', (socket)=>{
    console.log("Cliente conectado", socket.id);;
    socket.emit('mensajes', mensajes);

    socket.on('nuevo-mensaje', async(mensaje)=>{
        mensajes.push(mensaje);
        await api.create(mensaje);
        console.log(mensajes)
        io.sockets.emit('mensajes', mensajes);
    })
})

const PORT = 8080;
httpServer.listen(PORT, ()=>{
    console.log("Corriendo en el puerto ", PORT)
})


