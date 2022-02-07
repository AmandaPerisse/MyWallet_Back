import joi from 'joi';

const addEntradaSchema = joi.object({
    date: joi.required(),
    value: joi.number().required(),
    description: joi.string().required()
});

export default addEntradaSchema;