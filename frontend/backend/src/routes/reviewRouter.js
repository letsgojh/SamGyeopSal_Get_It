import {Router} from "express";
import { getAllReview,
    getReviewById,
    createReview,
    updateAllReview,
    updatePartReview,
    deleteReview
} from "../controllers/reviewController.js";
const router = Router();

router.get('/',getAllReview);
router.get('/:id',getReviewById);
router.post('/',createReview);
router.put('/:id',updateAllReview);
router.patch('/:id',updatePartReview);
router.delete('/:id',deleteReview);