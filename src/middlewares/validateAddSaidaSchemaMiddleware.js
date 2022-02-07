import addSaidaSchema from "../schemas/addSaidaSchema.js";

export default function validateAddSaidaSchemaMiddleware(req, res, next){
    const validation = addSaidaSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
    }
    next();
}