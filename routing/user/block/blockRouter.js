import roleMiddleware from '../../../middleware/roleMiddleware.js';
import controller from '../../authController.js'
import Express from 'express';

const router = new Express();

router.post('/ban', roleMiddleware(['admin', 'user']), controller.block_user)
router.post('/unban', roleMiddleware(['admin', 'user']), controller.unblock_user)


export default router