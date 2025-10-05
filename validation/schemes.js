import BaseJoi from "joi";
import joiDate from '@joi/date';

const Joi = BaseJoi.extend(joiDate);


export const userScheme = Joi.object({
    fio: Joi.string().required()
            .messages({
                'any.required': 'Имя обязательно',
                'string.empty': 'Имя не может быть пустым'
            }),
    birthday: Joi.date()
            .format('YYYY.MM.DD').max(new Date().toISOString().replace('/T/',' ').split(' ')[0])
            .required()
            .messages({
                'date.invalid': 'Дата рождения должна быть в формате YYYY.MM.DD',
                'date.max': 'Дата рождения не может быть в будущем',
                'any.required': 'Дата рождения обязательна'
            }),
    password: Joi.string()
                .required()
                .messages({
                    'string.min': 'Пароль должен содержать минимум 8 символов',
                    'string.pattern.base': 'Пароль должен содержать буквы разного регистра и цифры'
                }),
    email: Joi.string().required().email()
        .messages({
            'any.required': 'Email обязателен',
        }),
    role: Joi.string().valid('user', 'admin').required()    
        .messages({
            'any.required': 'Роль обязательна',
        })

});


export const userGetScheme = Joi.object({
    id: Joi.number().integer().required().positive()
    .messages({
            'number.integer': 'ID должен быть целым числом',
            'number.positive': 'ID должен быть положительным',
            'any.required': 'ID обязателен'
        })
});


export const paginationScheme = Joi.object({
    query: Joi.object({
        limit: Joi.number().integer().min(0).max(100).default(100),
        offset: Joi.number().integer().min(0).default(0)
    }),
    body: Joi.object().max(0)
        .messages({
            'object.max': 'Тело запроса не допускается',
        })
}).messages({
    'number.integer': 'Offset и Limit должны быть целыми числами',
    'number.min': '{#label} не может быть отрицательным или меньше 1',
    'number.max': 'Limit не может превышать 100'
});