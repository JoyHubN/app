export function checkBody(schema){
    return (req, res, next)=>{
        if(!req.body){
            return res.status(400).json({ message: 'Не передан body' })
        }
        
        const validationResult = schema.validate(req.body, { abortEarly: false });
        
        if(validationResult.error){
            return res.status(400).send(validationResult.error.details)
        }
        req.validatedBody = validationResult.value;
        next();
    }
}


export function checkQuery(schema){
    return (req, res, next)=>{
        const validationResult = schema.validate(req.query, { abortEarly: false });

        if(validationResult.error){
            return res.status(400).send(validationResult.error.details)
        }
        
        req.validatedQuery = validationResult.value.query;
        next();
    }
}


export function checkParams(schema){
    return (req, res, next)=>{
        const { query, body } = req;
        const validationResult = schema.validate({ query, body }, { abortEarly: false });

        if(validationResult.error){
            return res.status(400).send(validationResult.error.details)
        }
        req.validatedParams = validationResult.value.query;
        next();
    }
}