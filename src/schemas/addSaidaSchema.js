import joi from 'joi';

const addSaidaSchema = joi.object({
    date: joi.required(),
    value: joi.number().required(),
    description: joi.string().required()
});

export default addSaidaSchema;