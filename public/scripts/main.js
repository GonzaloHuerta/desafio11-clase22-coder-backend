const socket = io();

let contenido = '';

let sinProductos = document.getElementById('sin-productos');
let tablaProductos = document.getElementById('table-body-productos');

socket.on('productos', (productos)=>{
    console.log(productos)
    if(productos.length > 0 ){
        sinProductos.innerHTML = ''
        tablaProductos.innerHTML = productos.map(producto=>{
            return(
                `<tr>
                    <td>${producto.title}</td>
                    <td>${producto.price}</td>
                    <td><img src="${producto.thumbnail}" alt="Imagen del producto" width="100" height="100" /></td>
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
})

let form = document.getElementById('form');
let btnForm = document.getElementById('btn-form');

btnForm.addEventListener('click', (e)=>{
    e.preventDefault();
    let inputNombre = document.getElementById('nombre-producto');
    let inputPrecio = document.getElementById('precio');
    let inputUrlImagen = document.getElementById('url-imagen');
    let error = document.getElementById('error-productos');

    if(inputNombre.value == '' || inputPrecio.value == '' || inputUrlImagen.value == ''){
        error.style.display = 'inline-block';
        return
    }else{
        error.style.display = 'none';
        const nuevoProducto = {
            title: inputNombre.value,
            price: inputPrecio.value,
            thumbnail: inputUrlImagen.value
        }

        socket.emit('nuevo-producto', nuevoProducto);
    
        form.submit();
    
        inputNombre.value = '';
        inputPrecio.value = '';
        inputUrlImagen.value = '';
    }
 
})

//Sección mensajes

let btnChat = document.getElementById('btn-chat');

btnChat.addEventListener('click', (e)=>{
    let inputEmail = document.getElementById('email');
    let inputMensaje = document.getElementById('mensaje');
    let error = document.getElementById('error-mensajes');

    if(inputEmail.value == ''){
        error.style.display = 'inline-block';
        return
    }else{
        error.style.display = 'none';
        const mensaje = {
            email: inputEmail.value,
            mensaje: inputMensaje.value,
            fecha: new Date().toLocaleString()
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
                `<div class="cuerpo-mensaje">
                    <span class="email">${mensaje.email} </span>
                    <span class="fecha">[${mensaje.fecha}]: </span>
                    <span class="mensaje">${mensaje.mensaje}</span>
                </div>`
            )
        }).join(" ")
    }
    
})