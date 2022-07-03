import mongoose from 'mongoose';
import config from '../config.js';

mongoose.connect(config.mongoDB.URL, config.mongoDB.options);

class ContenedorMongoDb{
    constructor(collName, docSchema){
        this.collection = mongoose.model(collName, docSchema);
    }

    async getAll(){
        try {
            const contenido = await this.collection.find({});
            return contenido;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const contenido = await this.collection.find({id: id})
            return contenido;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const nuevo = await this.collection.create(obj);
            return nuevo;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const borrado = await this.collection.deleteOne({id: id});
            return borrado;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try{
            const actualizado = await this.collection.findByIdAndUpdate(id, obj);
            return actualizado;
        }catch(error){
            console.log(error);
        }
    }
}

export default ContenedorMongoDb;