import Express from 'express';
import controller from '../authController.js'
import { checkBody } from '../../validation/validated.js'
import userScheme from '../../validation/schemes.js';

const router = new Express();

router.post('/registration', checkBody(userScheme), controller.registration);
router.post('/login', controller.login);

export default router;