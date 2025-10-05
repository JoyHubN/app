import { registrationUser, geUserForName, getUsers, getUser, blockUser } from "../models/User.js";
import errors from '../errors.js';
import bcript from 'bcrypt';
import jwt from 'jsonwebtoken';


const generateAccessToken = (id, roles, username) => {
    const payload = {
        id,
        roles,
        username
    };
    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1h'}, {algorithm: ['H256']})
}

class authController{
    async registration(req, res){
        try {
            const { fio, birthday, email, password, role } = req.validatedBody;
            if (fio, birthday, email, password, role){
                const user = await registrationUser({fio, birthday, role, profiles: {email, password}})
                if (typeof user.code == "undefined") {
                    return res.status(200).json({ message: true });
                }
                else{
                    return res.status(400).json({ error: errors[user.code]} )
                }
            }
            else{
                return res.status(400).json({ error: 'Нет нужных данных' })
            }
        }
        catch (e) {
            console.log(e);
            return res.json(400)
        }
    }
    async login(req, res){
        try {
            const {email, password} = req.body;
            const user = await geUserForName(email);
            if (user == false | user == null){
                return res.status(404).json({ error: 'Нет такого пользователя' })
            }
            else{
                const validPassword = bcript.compare(password, user.profiles[0].password);
                if (!validPassword){
                    return res.status(400).json({ error: 'Неверный пароль' })
                }
                else{
                    const token = generateAccessToken(user.user_id, user.role, user.fio);
                    return res.json({token})
                }
            }
        }
        catch (e) {
            console.log(e);
            return res.json(400)
        }
    }

    async getUser(req, res){
        try {
            if (req.body){
                return res.status(400).json({ message: 'Тело запроса не должно быть отправлено' })
            }
            const { id, roles } = jwt.decode(req.headers.authorization.split(' ')[1], process.env.JWT_KEY);
            if (roles === 'user'){
                const user = await getUser(id);
                if (typeof user.code == 'undefined'){
                    return res.status(200).json({ user })
                }
                else{
                    return res.status(400).json({ message: user.code })
                }
            }
            else if (roles === 'admin'){
                const user = await getUser(req.query.id);
                if (user){
                    if (typeof user.code == 'undefined'){
                        return res.status(200).json({user})
                    }
                    else{
                        return res.status(400).json({ message: user.code })
                        }
                }
                else {
                    return res.status(404).json({ message: 'Пользователь не найден' })
                }
            }
        }
        catch (e) {
            console.log(e);
            return res.status(400)
        }
    }
    async get_users(req, res){
        try {

            
            const { offset, limit } = req.validatedParams;

            const user = await getUsers(+offset, +limit);
            if (typeof user.code == 'undefined'){
                return res.status(200).json(user)
            }
            else{
                return res.status(400).json({ message: user.code })
            }
        }
        catch (e) {
            console.log(e);
            return res.status(400)
        }
    }
    async block_user(req, res){
        try {
            const { id, roles } = jwt.decode(req.headers.authorization.split(' ')[1], process.env.JWT_KEY);
            if (roles === 'user'){
                const user = await blockUser(id, false);
                if (user){
                    return res.status(200).json({ message: 'Вы успешно заблокированы', user })
                }
                else{
                    return res.status(400).json({ message: user })
                }
            }
            else if(roles === 'admin'){
                const { user_id } = req.body;
                const user = await blockUser(user_id, false)

                if (user){
                    const whoId = id === user_id ? 'себя' : `${id} ${user.fio}`;
                    return res.status(200).json({ message: `Вы успешно заблокировали ${whoId}`, user }) 
                }
                else{
                    return res.status(400).json({ message: user })
                }
            }

        }
        catch (e) {
            console.log(e);
            return res.json(400)
        }
    }   

    async unblock_user(req, res){
        try {
            const { id, roles } = jwt.decode(req.headers.authorization.split(' ')[1], process.env.JWT_KEY);
            if (roles === 'user'){
                const user = await blockUser(id, true);
                if (user){
                    return res.status(200).json({ message:'Вы успешно разблокированы', user })
                }
                else{
                    return res.status(400).json({ message: user })
                }
            }
            else if(roles === 'admin'){
                const { user_id } = req.body;
                const user = await blockUser(user_id, false);

                if (user){
                    const whoId = id === user_id ? 'себя' : `${id} ${user.fio}`;
                    return res.status(200).json({ message: `Вы успешно разблокировали ${whoId}`, user }) 
                }
                else{
                    return res.status(400).json({ message: user })
                }
            }

        }
        catch (e) {
            console.log(e)
            return res.json(400)
        }
    }   

    async reset_password(req, res){
        try {
            const { id, roles } = jwt.decode(req.headers.authorization.split(' ')[1], process.env.JWT_KEY);
            if (roles === 'user'){
                const user = await blockUser(id, true);
                if (user){
                    return res.status(200).json({ message: 'Вы успешно разблокированы', user })
                }
                else{
                    return res.status(400).json({ message: user })
                }
            }
            else if(roles === 'admin'){
                const { user_id } = req.body;
                const user = await blockUser(user_id, false);

                if (user){
                    const whoId = id === user_id ? 'себя' : `${id} ${user.fio}`;
                    return res.status(200).json({ message: `Вы успешно разблокировали ${whoId}`, user }) 
                }
                else{
                    return res.status(400).json({ message: user })
                }
            }

        }
        catch (e) {
            console.log(e)
            return res.json(400)
        }
    }   
};

export default new authController;