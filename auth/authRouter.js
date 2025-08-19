import Express from 'express';
import controller from './authController.js'
import { checkBody } from '../validation/validated.js'
import userScheme from '../validation/schemes.js';

import roleMiddleware from '../middleware/roleMiddleware.js';

const router = new Express();

// post
router.post('/registration', checkBody(userScheme), controller.registration);
router.post('/login', controller.login);
router.post('/ban', roleMiddleware(['admin', 'user']), controller.block_user)
router.post('/unban', roleMiddleware(['admin', 'user']), controller.unblock_user)

// get;
router.get('/user', roleMiddleware(['admin', 'user']), controller.getUser);
router.get('/users', roleMiddleware(['admin']) ,controller.get_users);

export default router;