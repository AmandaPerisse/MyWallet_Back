import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

import cadastro from './src/routes/cadastroRouter.js';
import login from './src/routes/loginRouter.js';
import addEntrada from './src/routes/addEntradaRouter.js';
import addSaida from './src/routes/addSaidaRouter.js';
import registros from './src/routes/registrosRouter.js';

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use(cadastro);
app.use(login);
app.use(addEntrada);
app.use(addSaida);
app.use(registros);

setInterval(remocaoAutomatica, 60000);

async function remocaoAutomatica(){
    const clientConnected = await mongoClient.connect();
    const db = clientConnected.db("mywallet");
    const collection = db.collection('sessions');
    const resultado = await collection.find().toArray();
    if(resultado.length>0){
        for(let i = 0; i< resultado.length; i++){
            const agora = Date.now();
            if (agora - resultado[i].time >= 10000){
                await collection.deleteOne({userId: resultado[i].userId});
            }
        }
    }
    mongoClient.close();
}

app.listen(5000, () =>{
    console.log("Rodando");
});