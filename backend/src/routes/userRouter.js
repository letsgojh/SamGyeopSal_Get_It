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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication & profile management
 */


/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nickname
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post("/signup", signup);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공, 토큰 반환
 *       401:
 *         description: 인증 실패
 */
router.post("/login", login);


/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: 내 정보 조회
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 인증된 사용자 정보 반환
 *       401:
 *         description: 인증 필요
 */
router.get("/me", authMiddleware, getMe);



/**
 * @swagger
 * /api/users/favorites:
 *   get:
 *     summary: 사용자가 좋아요한 쇼 목록 조회
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 좋아요한 쇼 리스트 반환
 *       401:
 *         description: 인증 실패
 */
router.get("/favorites", authMiddleware, addFavoriteShow);


/**
 * @swagger
 * /api/users/favorites/{showId}:
 *   post:
 *     summary: 특정 쇼 좋아요 추가
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 쇼 ID
 *     responses:
 *       201:
 *         description: 좋아요 추가됨
 *       401:
 *         description: 인증 실패
 */
router.post("/favorites/:showId", authMiddleware, seeUserFavoriteShows);


/**
 * @swagger
 * /api/users/favorites/{showId}:
 *   delete:
 *     summary: 특정 쇼 좋아요 삭제
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 쇼 ID
 *     responses:
 *       200:
 *         description: 좋아요 삭제 완료
 *       401:
 *         description: 인증 필요
 */
router.delete("/favorites/:showId", authMiddleware, deleteUserFavoriteShows);


export default router;
