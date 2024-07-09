import {Router} from 'express';
import authController from '../controllers/user.controller';

const router = Router();

router.post("/signup",authController.Signup)
router.post("/signin",authController.Signin)


export default router;