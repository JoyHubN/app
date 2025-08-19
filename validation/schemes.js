import BaseJoi from "joi";
import joiDate from '@joi/date'

const Joi = BaseJoi.extend(joiDate);


const userScheme = Joi.object({
    fio: Joi.string().required(),
    birthday: Joi.date().format('YYYY.MM.DD').max(new Date().toISOString().replace('/T/',' ').split(' ')[0]).required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    role: Joi.string().valid('user', 'admin').required()
});

export default userScheme;