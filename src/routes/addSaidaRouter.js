import { Router } from 'express';
import { addSaida } from '../controllers/addSaida.js';
import validateAddSaidaSchemaMiddleware from '../middlewares/validateAddSaidaSchemaMiddleware.js';

const addSaidaRouter = Router();

addSaidaRouter.post("/saida", validateAddSaidaSchemaMiddleware, addSaida);

export default addSaidaRouter;