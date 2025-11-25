import { Router } from "express";
import { 
    showSeatByShow,
    showReviewBySeat,
    writeSeatReview,
    updateSeatReview,
    deleteSeatReview,
} from "../controllers/seatController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Seats
 *   description: 공연별 좌석 및 좌석 리뷰 API
 */


/**
 * @swagger
 * /seats/shows/{id}/seats:
 *   get:
 *     summary: 특정 공연의 좌석 목록 조회
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 공연 ID
 *     responses:
 *       200:
 *         description: 공연별 좌석 목록 반환
 *       404:
 *         description: 좌석 정보를 찾을 수 없음
 */
router.get("/shows/:id/seats", showSeatByShow);



/**
 * @swagger
 * /seats/shows/{id}/seats/{seatId}/reviews:
 *   get:
 *     summary: 특정 공연의 특정 좌석에 대한 리뷰 목록 조회
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 공연 ID
 *       - in: path
 *         name: seatId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 좌석 ID
 *     responses:
 *       200:
 *         description: 좌석 리뷰 목록 반환
 *       404:
 *         description: 좌석 또는 리뷰 데이터 없음
 */
router.get("/shows/:id/seats/:seatId/reviews", showReviewBySeat);



/**
 * @swagger
 * /seats/shows/{id}/seats/{seatId}/reviews:
 *   post:
 *     summary: 특정 좌석에 리뷰 작성
 *     tags: [Seats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 공연 ID
 *       - in: path
 *         name: seatId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 좌석 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "무대 잘 보이고 음향 좋았어요!"
 *     responses:
 *       201:
 *         description: 리뷰 작성 성공
 *       400:
 *         description: 리뷰 내용이 올바르지 않음
 *       401:
 *         description: 인증 필요
 */
router.post("/shows/:id/seats/:seatId/reviews", authMiddleware, writeSeatReview);



/**
 * @swagger
 * /seats/reviews/{id}:
 *   put:
 *     summary: 좌석 리뷰 수정
 *     tags: [Seats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 리뷰 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: 리뷰 수정 성공
 *       403:
 *         description: 본인이 작성한 리뷰가 아님
 *       404:
 *         description: 리뷰 없음
 */
router.put("/reviews/:id", authMiddleware, updateSeatReview);



/**
 * @swagger
 * /seats/reviews/{id}:
 *   delete:
 *     summary: 좌석 리뷰 삭제
 *     tags: [Seats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 리뷰 ID
 *     responses:
 *       200:
 *         description: 리뷰 삭제 완료
 *       403:
 *         description: 본인이 작성한 리뷰가 아님
 *       404:
 *         description: 리뷰 없음
 */
router.delete("/reviews/:id", authMiddleware, deleteSeatReview);


export default router;
