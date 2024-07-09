import express ,{Router}from 'express';
import testRouter from './test';
import SignupRouter from './user.router';

const router = Router();

router.use(express.json());


router.use("/test",testRouter);
router.use("/user", SignupRouter);

export default router;