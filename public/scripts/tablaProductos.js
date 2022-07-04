const socket = io();
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
faker.setLocale('es');
const productos = [];

const generarProductos = ()=>{
    for (let i = 0; i < 5; i++) {
        let obj = {};
        obj.nombre = faker.commerce.product();
        obj.precio = faker.commerce.price();
        obj.foto = faker.image.image();
        productos.push(obj);
    }

    return productos;
}

generarProductos();

let contenido = '';

let sinProductos = document.getElementById('sin-productos');
let tablaProductos = document.getElementById('table-body-productos');

if(productos.length > 0 ){
    sinProductos.innerHTML = ''
    tablaProductos.innerHTML = productos.map(producto=>{
        return(
            `<tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td><img src="${producto.foto}" alt="Imagen del producto" width="100" height="100" /></td>
            </tr>`
        )
    }).join(" ")
}else{
    contenido = contenido + 
    `<div class="alert alert-warning" role="alert">
        Aún no hay productos cargados
    </div>`

    sinProductos.innerHTML = contenido;
}   

let btnChat = document.getElementById('btn-chat');

btnChat.addEventListener('click', (e)=>{
    let inputEmail = document.getElementById('email');
    let inputMensaje = document.getElementById('mensaje');
    let inputNombre = document.getElementById('nombre');
    let inputApellido = document.getElementById('apellido');
    let inputEdad = document.getElementById('edad');
    let inputAlias = document.getElementById('alias');
    let inputAvatar = document.getElementById('avatar');
    let error = document.getElementById('error-mensajes');

    if(inputEmail.value == ''){
        error.style.display = 'inline-block';
        return
    }else{
        error.style.display = 'none';
        const mensaje = {
            author:{
                id: inputEmail.value,
                nombre: inputNombre.value,
                apellido: inputApellido.value,
                edad: inputEdad.value,
                alias: inputAlias.value,
                avatar: inputAvatar.value,
            },
            fecha: new Date().toLocaleString(),
            text: inputMensaje.value,
        }

        socket.emit('nuevo-mensaje', mensaje);
        inputMensaje.value = '';
    }
})

let divMensajes = document.getElementById('mensajes');

socket.on('mensajes', (mensajes)=>{
    console.log(mensajes);
    if(mensajes){
        divMensajes.innerHTML = mensajes.map(mensaje=>{
            return(
                `<div class="cuerpo-mensaje mt-2">
                    <img src="${mensaje.author.avatar}" width="50px" style="border-radius: 200px; height: 50px;"/>
                    <span class="email">${mensaje.author.id} </span>
                    <span class="fecha">[${mensaje.fecha}]: </span>
                    <span class="mensaje">${mensaje.text}</span>
                </div>`
            )
        }).join(" ")
    }
    
})