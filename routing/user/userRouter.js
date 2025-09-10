import roleMiddleware from '../../middleware/roleMiddleware.js';
import controller from '../authController.js'
import Express from 'express';

const router = new Express();

router.get('/user', roleMiddleware(['admin', 'user']), controller.getUser);
router.get('/users', roleMiddleware(['admin']) ,controller.get_users);


export default router