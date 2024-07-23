import { MongoClient } from "mongodb"
import Weather from "./weather.mjs"

class Database {
    constructor(config){
        this.url = config.url
        this.database = config.dbName
        this.config = config
    }

    async init(){
        try{
            const client = new MongoClient(this.url);
            await client.connect();
            const database = await client.db(this.dbName);
            // Inicializacion de colecciones
            this.weather = new Weather({ collection: database.collection('weather') }, this.config.get('weather'))

        } catch (err){
            console.log('error', err)
        }
    }
}

export default Database