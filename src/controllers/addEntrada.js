import joi from 'joi';
import { v4 as uuid } from 'uuid';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export async function addEntrada(req, res) {

    const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if(!token) return res.sendStatus(401);
        const clientConnected = await mongoClient.connect();
        const db = clientConnected.db("mywallet");
        const collectionSessions = db.collection('sessions');
        const session = await collectionSessions.findOne({ token }); 
        if (!session) {
            res.sendStatus(401);
            mongoClient.close();
        }
        else{
            const id = session.userId;
            await collectionSessions.deleteOne({token: token});
            const tokenNovo = uuid();
            await collectionSessions.insertOne({userId: id, token: tokenNovo, time: Date.now()})
            const collection = db.collection('registros');
            await collection.insertOne({userId: id, date: req.body.date, value: req.body.value, description: req.body.description, type: "entrada"});
            res.send({token: tokenNovo});
            mongoClient.close();
        }
}