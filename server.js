import express from 'express';
import http from 'http'
import {Server as ioServer} from 'socket.io';
import path from 'path';
import {mensajesDao as api} from './src/daos/index.js';
const app = express();
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = http.createServer(app);

const io = new ioServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//const mensajes = await contenedorMensajes.obtenerMensajes();

const mensajes = await api.getAll();
const productos = [];
//console.log("Productos: ", productos);
console.log("Mensajes: ", mensajes);

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


