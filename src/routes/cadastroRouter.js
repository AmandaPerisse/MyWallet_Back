import { Router } from 'express';
import { cadastrar } from '../controllers/cadastro.js';
import validateCadastroSchemaMiddleware from '../middlewares/validateCadastroSchemaMiddleware.js';

const cadastroRouter = Router();

cadastroRouter.post("/cadastro", validateCadastroSchemaMiddleware, cadastrar);

export default cadastroRouter;