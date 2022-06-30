import express from 'express';
import http from 'http'
import {Server as ioServer} from 'socket.io';
import Contenedor from './contenedor.js';
import {options} from './db/configDB.js';
import path from 'path';
const app = express();
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = http.createServer(app);

const io = new ioServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const contenedorProductos = new Contenedor(options.mariaDB, 'productos');
const contenedorMensajes = new Contenedor(options.sqlite, 'mensajes');

const productos = await contenedorProductos.obtenerTodosLosProductos();
const mensajes = await contenedorMensajes.obtenerMensajes();

//console.log("Productos: ", productos);
console.log("Mensajes: ", mensajes);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/views/index.html'));
})

app.get('/api/productos', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/views/tabla-productos.html'));
})

app.get('/productos', (req, res)=>{
    res.json(contenedorProductos.obtenerTodosLosProductos());
})

app.post('/productos', async(req, res)=>{
    const producto = req.body;
    await contenedorProductos.guardarProducto(producto);
    res.redirect('/')
})

io.on('connection', (socket)=>{
    console.log("Cliente conectado", socket.id);
    socket.emit('productos', productos);
    socket.emit('mensajes', mensajes);

    socket.on('nuevo-producto', (producto)=>{
        productos.push(producto);
        io.sockets.emit('productos', productos);
    })

    socket.on('nuevo-mensaje', async(mensaje)=>{
        mensajes.push(mensaje);
        await contenedorMensajes.guardarMensajes(mensaje);
        console.log(mensajes)
        io.sockets.emit('mensajes', mensajes);
    })
})

const PORT = 8080;
httpServer.listen(PORT, ()=>{
    console.log("Corriendo en el puerto ", PORT)
})


