import express ,{ Router,Request ,Response} from "express";

const router = Router();

router.get("/v1", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

export default router;