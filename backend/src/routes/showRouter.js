import {Router} from "express";
import { 
    showAllShows,
    showDetailshow,
    checkCategoricalShow,
    showRecommendShow,
    searchShow
} from "../controllers/showController.js";
const router = Router();

router.get("/shows",showAllShows);
router.get("/shows/:id",showDetailshow);
router.get("/shows/search",checkCategoricalShow);
router.get("/operations/recommended",showRecommendShow);
router.get("/shows/search",searchShow);

export default router;