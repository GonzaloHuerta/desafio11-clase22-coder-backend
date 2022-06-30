import knex from 'knex';

class Contenedor{
    constructor(dbConfig, table){
        this.dbConfig = dbConfig;
        this.table = table;
    }
     
    productos = [];
    mensajes = [];

    async guardarProducto(nuevoProducto){
        if(!await knex(this.dbConfig).schema.hasTable(this.table)){
            try {
                await knex(this.dbConfig).schema.createTable(this.table, table=>{
                    table.increments('id').primary().unique()
                    table.string('title').notNullable()
                    table.float('price').notNullable()
                    table.string('thumbnail').notNullable()
                })
                
                knex(this.dbConfig)(this.table).insert(nuevoProducto)
                console.log("Tabla creada correctamente y producto agregado correctamente");
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                await knex(this.dbConfig)(this.table).insert(nuevoProducto)
                console.log("Producto agregado correctamente")
            } catch (error) {
                console.log(error)
            }
        }
    }

    async obtenerProductoPorId(id){
        try {
            const producto = await knex(this.dbConfig).from(this.table).select('*').where('id', id);
        } catch (error) {
            console.log(error)
        }
    }

    async obtenerTodosLosProductos(){
        const productos = await knex(this.dbConfig).from(this.table).select('*');
        return productos;
    }

    async borrarProductoPorId(id){
        try {
            const productoBorrado = await knex(this.dbConfig).from(this.table).where('id', id).delete();
            return productoBorrado;
        } catch (error) {
            console.log(error)
        }
    }

    async guardarMensajes(nuevoMensaje){
        if(!await knex(this.dbConfig).schema.hasTable(this.table)){
            try {
                await knex(this.dbConfig).schema.createTable(this.table, table=>{
                    table.increments('id').primary().unique()
                    table.string('email').notNullable()
                    table.date('fecha').notNullable()
                    table.string('mensaje').notNullable()
                })
                
                knex(this.dbConfig)(this.table).insert(nuevoMensaje)
                console.log("Tabla creada correctamente y mensaje guardado correctamente");
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                await knex(this.dbConfig)(this.table).insert(nuevoMensaje)
                console.log("Mensaje guardado correctamente")
            } catch (error) {
                console.log(error)
            }
        }
    }

    async obtenerMensajes(){
        let mensajes = [];
        if(await knex(this.dbConfig).schema.hasTable(this.table)){
            mensajes = await knex(this.dbConfig).from(this.table).select('*');
        }
        return mensajes;
    }
}

export default Contenedor;