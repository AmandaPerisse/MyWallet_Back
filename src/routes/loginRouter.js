import { Router } from 'express';
import { logar } from '../controllers/login.js';
import validateLoginSchemaMiddleware from '../middlewares/validateLoginSchemaMiddleware.js';

const loginRouter = Router();

loginRouter.post("/login", validateLoginSchemaMiddleware, logar);

export default loginRouter;