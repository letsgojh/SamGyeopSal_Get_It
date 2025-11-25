import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { 
    getMe,
    addFavoriteShow,
    seeUserFavoriteShows,
    deleteUserFavoriteShows,
    signup,
    login
} from "../controllers/userController.js";
const router = Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/me",authMiddleware,getMe); // 내 정보 조회는 인증된 사람만 가능
//사용자가 작성한 리뷰 목록 구현하기
router.get("/favorites",authMiddleware,addFavoriteShow);
router.post("/favorites/:showId",authMiddleware,seeUserFavoriteShows);
router.delete("/favorites/:showId",authMiddleware,deleteUserFavoriteShows);

export default router;