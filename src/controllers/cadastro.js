import joi from 'joi';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export async function cadastrar(req, res){

    const clientConnected = await mongoClient.connect();
    const db = clientConnected.db("mywallet");
    const collection = db.collection('usuarios');
    const senhaHash = bcrypt.hashSync(req.body.password, 10);
    await collection.insertOne({name: req.body.name, email: req.body.email, password: senhaHash}) 
    res.sendStatus(201);
    mongoClient.close();
}