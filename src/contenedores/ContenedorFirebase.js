import admin from 'firebase-admin';
import serviceAccount  from '../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export class ContenedorFirebase{
    constructor(collName){
        this.db = admin.firestore();
        this.collection = this.db.collection(collName);
    }

    async getAll(){
        try {
            const contenido = await this.collection.get();
            return contenido.docs.map(doc=>doc.data())
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const contenido = await this.collection.doc(id).get();
            return contenido.data();
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const nuevo = await this.collection.add(obj);
            return this.getById(nuevo.id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const borrado = await this.collection.doc(id).delete();
            return borrado;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const actualizado = await this.collection.doc(id).update(obj);
            return actualizado;
        } catch (error) {
            console.log(error);
        }
      }
}