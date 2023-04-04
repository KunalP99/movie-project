import express from 'express';
import { signUpUser } from '../controllers/userController';

const router = express.Router();

router.post('/sign-up', signUpUser);

export default router;