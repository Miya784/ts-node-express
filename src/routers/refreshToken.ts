import {Router} from 'express';
import refreshTokenController from '../controllers/refreshToken.controller';

const router = Router();

router.get("/refresh-token",refreshTokenController)

export default router;