import {Router} from 'express';
import tokenController from '../controllers/refreshToken.controller';

const router = Router();

router.get("/refresh-token",tokenController.refreshTokenController);
router.get("/check-token",tokenController.checkToken);

export default router;