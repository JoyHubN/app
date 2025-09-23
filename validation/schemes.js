import BaseJoi from "joi";
import joiDate from '@joi/date'

const Joi = BaseJoi.extend(joiDate);


export const userScheme = Joi.object({
    fio: Joi.string().required(),
    birthday: Joi.date()
            .format('YYYY.MM.DD').max(new Date().toISOString().replace('/T/',' ').split(' ')[0])
            .required()
            .messages({
                'date.invalid': 'Дата рождения должна быть в формате YYYY.MM.DD',
                'date.max': 'Дата рождения не может быть в будущем'
            }),
    password: Joi.string()
                .required()
                .messages({
                    'string.min': 'Пароль должен содержать минимум 8 символов',
                    'string.pattern.base': 'Пароль должен содержать буквы разного регистра и цифры'
                }),
    email: Joi.string().required().email(),
    role: Joi.string().valid('user', 'admin').required()
});


export const userGetScheme = Joi.object({
    id: Joi.number().integer().required().positive()
    .messages({
            'number.integer': 'ID должен быть целым числом',
            'number.positive': 'ID должен быть положительным',
            'any.required': 'ID обязателен'
        })
})


export const noParamsScheme = Joi.object({
    query: Joi.object().max(0)
        .messages({
            'object.max': 'Query-параметры не допускаются',
        }),
    body: Joi.object().max(0)
        .messages({
            'object.max': 'Тело запроса не допускается',
        })
})