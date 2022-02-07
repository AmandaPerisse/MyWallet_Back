import bcrypt, { compareSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export async function logar(req, res) {

    const clientConnected = await mongoClient.connect();
    const db = clientConnected.db("mywallet");
    const collection = db.collection('usuarios');
    try{
        const usuario = await collection.findOne({email: req.body.email})
        if(usuario && bcrypt.compareSync(req.body.password, usuario.password)){
            const token = uuid();
            const collectionSessions = db.collection('sessions');
            await collectionSessions.insertOne({userId: usuario._id, token: token, time: Date.now()})
            res.send({user: usuario.name, token: token});
            mongoClient.close();
        }
        else{
            res.send(false);
            mongoClient.close();
        }
    }catch(e){
        res.sendStatus(400);
        mongoClient.close();
    }
}