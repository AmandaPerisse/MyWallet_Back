import { Router } from 'express';
import { addEntrada } from '../controllers/addEntrada.js';
import validateAddEntradaSchemaMiddleware from '../middlewares/validateAddEntradaSchemaMiddleware.js';

const addEntradaRouter = Router();

addEntradaRouter.post("/entrada", validateAddEntradaSchemaMiddleware, addEntrada);

export default addEntradaRouter;