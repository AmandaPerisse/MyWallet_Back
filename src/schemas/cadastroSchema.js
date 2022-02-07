import joi from 'joi';

const cadastroSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default cadastroSchema;