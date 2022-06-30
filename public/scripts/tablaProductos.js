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

let tablaProductos = document.getElementById('table-body-productos');

if(productos.length > 0 ){
    //sinProductos.innerHTML = ''
    tablaProductos.innerHTML = productos.map(producto=>{
        return(
            `<tr>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
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
