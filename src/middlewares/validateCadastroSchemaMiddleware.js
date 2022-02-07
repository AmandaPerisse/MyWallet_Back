import cadastroSchema from "../schemas/cadastroSchema.js";

export default function validateCadastroSchemaMiddleware(req, res, next){
    const validation = cadastroSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
    }
    next();
}