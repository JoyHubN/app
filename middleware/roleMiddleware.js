import jwt from 'jsonwebtoken';

export default (roles) => {
    return function(req, res, next){
        if (req.method === 'OPTIONS'){
            next();
        }
        try{
            const token = req.headers.authorization.split(' ')[1];

            if (!token){
                return res.status(403).json({message:'Пользователь не авторизован'})
            }
            else{
                const {roles: userRoles} = jwt.verify(token, process.env.JWT_KEY, {algorithms: ['HS256']});
                if (!roles.includes(userRoles)){
                    return res.status(403).json({message : 'У вас нет доступа'})
                }
                next()
            }
        }
        catch (e){
            console.log(e);
            return res.status(403).json({message:'Пользователь не авторизован'})
        }
    }
}