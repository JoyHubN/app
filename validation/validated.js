export function checkBody(schema){
    return (req, res, next)=>{
        const validationResult = schema.validate(req.body);

        if(validationResult.error){
            return res.status(400).send(validationResult.error.details)
        }
        next();
    }
}


export function checkQuery(schema){
    return (req, res, next)=>{
        const validationResult = schema.validate(req.query);

        if(validationResult.error){
            return res.status(400).send(validationResult.error.details)
        }
        next();
    }
}


export function checkParams(schema){
    return (req, res, next)=>{
        const [query, body] = [req.query, req.body];
        const validationResult = schema.validate({query, body});

        if(validationResult.error){
            return res.status(400).send(validationResult.error.details)
        }
        next();
    }
}