import addEntradaSchema from "../schemas/addEntradaSchema.js";

export default function validateAddEntradaSchemaMiddleware(req, res, next){
    const validation = addEntradaSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
    }
    next();
}