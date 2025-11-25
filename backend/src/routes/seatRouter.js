import {Router} from "express";
import { 
    showSeatByShow,
    showReviewBySeat,
    writeSeatReview,
    updateSeatReview,
    deleteSeatReview,
    //addReviewLike
} from "../controllers/seatController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/shows/:id/seats",showSeatByShow);
router.get("/shows/:id/seats/:seatId/reviews",showReviewBySeat);
router.post("/shows/:id/seats/:seatId/reviews",authMiddleware,writeSeatReview);
router.put("/reviews/:id",authMiddleware,updateSeatReview);
router.delete("/reviews/:id",authMiddleware,deleteSeatReview);
//outer.post("/reviews/:id/like",authMiddleware,addReviewLike);

export default router;