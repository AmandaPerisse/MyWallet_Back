import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);

export async function getRegistros(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(400);
    const clientConnected = await mongoClient.connect();
    const db = clientConnected.db("mywallet");
    const collectionSessions = db.collection('sessions');
    const session = await collectionSessions.findOne({ token }); 
    if (!session) {
        res.sendStatus(401);
        mongoClient.close();
    }
    else{
        const collection = db.collection('registros');
        const registros = await collection.find({userId: session.userId}).toArray();
        res.send(registros);   
    }
}
export async function sair(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(400);
    const clientConnected = await mongoClient.connect();
    const db = clientConnected.db("mywallet");
    const collectionSessions = db.collection('sessions');
    const session = await collectionSessions.findOne({ token }); 
    if (session) {
        await collectionSessions.deleteOne({token: token});
    }
    res.sendStatus(201);
    mongoClient.close();
}