import express ,{Router}from 'express';
import testRouter from './test';
import SignupRouter from './user.router';
import refreshToken from './refreshToken';

const router = Router();

router.use(express.json());


router.use("/test",testRouter);
router.use("/user", SignupRouter);
router.use("/v1",refreshToken)


export default router;