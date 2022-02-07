import { Router } from 'express';
import { getRegistros, sair } from '../controllers/registros.js';

const registrosRouter = Router();

registrosRouter.get("/registros", getRegistros);
registrosRouter.delete("/registros", sair);

export default registrosRouter;