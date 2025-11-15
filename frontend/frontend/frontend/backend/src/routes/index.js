import { Router } from "express";
import seatRouter from './reviewRouter.js';
const router = Router();

router.use('/seats',seatRouter);

export default router;