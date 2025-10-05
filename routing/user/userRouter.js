import roleMiddleware from '../../middleware/roleMiddleware.js';
import controller from '../authController.js'
import Express from 'express';
import { checkQuery, checkParams } from '../../validation/validated.js';
import { userGetScheme, paginationScheme } from '../../validation/schemes.js';

const router = new Express();

router.get('/user', roleMiddleware(['admin', 'user']), 
        checkQuery(userGetScheme), 
    controller.getUser);

router.get('/users', roleMiddleware(['admin']), 
        checkParams(paginationScheme), 
    controller.get_users);


export default router