import { Router } from "express";
import { 
    showVenuesList,
    showDetailVenue,
    showVenuebyshow
} from "../controllers/venueController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: 공연장(Venue) 관련 API
 */


/**
 * @swagger
 * /venues:
 *   get:
 *     summary: 공연장 목록 전체 조회
 *     tags: [Venues]
 *     responses:
 *       200:
 *         description: 모든 공연장 목록 반환
 */
router.get("/", showVenuesList);


/**
 * @swagger
 * /venues/{id}:
 *   get:
 *     summary: 특정 공연장 상세 조회
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 공연장 ID
 *     responses:
 *       200:
 *         description: 공연장 상세 정보 반환
 *       404:
 *         description: 공연장을 찾을 수 없음
 */
router.get("/:id", showDetailVenue);


/**
 * @swagger
 * /venues/{id}/shows:
 *   get:
 *     summary: 특정 공연이 열리는 공연장 정보 조회
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 공연 ID
 *     responses:
 *       200:
 *         description: 해당 공연이 열리는 공연장 정보 반환
 *       404:
 *         description: 공연 또는 공연장 정보를 찾을 수 없음
 */
router.get("/:id/shows", showVenuebyshow);


export default router;
