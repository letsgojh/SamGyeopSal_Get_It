import { Router } from "express";
import seatRouter from "./seatRouter.js";
import showRouter from "./showRouter.js";
import userRouter from "./userRouter.js";
import venueRouter from "./venueRouter.js";
import notificationRouter from "./notificationRouter.js";

const router = Router();

router.use('/users',userRouter);
router.use('/shows',showRouter);
router.use('/seats',seatRouter);
router.use('/venues',venueRouter);
router.use('/notification',notificationRouter);

export default router;