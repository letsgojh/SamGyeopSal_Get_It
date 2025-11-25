import { Router } from "express";
import { 
    showAllShows,
    showDetailshow,
    checkCategoricalShow,
    showRecommendShow,
    searchShow
} from "../controllers/showController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Shows
 *   description: 공연(Show) 관련 API
 */


/**
 * @swagger
 * /shows:
 *   get:
 *     summary: 전체 공연 목록 조회
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: "전체 공연 리스트 반환"
 */
router.get("/", showAllShows);


/**
 * @swagger
 * /shows/{id}:
 *   get:
 *     summary: 특정 공연 상세 조회
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 공연 ID
 *     responses:
 *       200:
 *         description: 공연 상세 정보 반환
 *       404:
 *         description: 해당 공연을 찾을 수 없음
 */
router.get("/:id", showDetailshow);


/**
 * @swagger
 * /shows/category:
 *   get:
 *     summary: 카테고리별 공연 조회
 *     tags: [Shows]
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: "공연 카테고리 (예: musical, concert, play)"
 *     responses:
 *       200:
 *         description: 해당 카테고리의 공연 목록 반환
 *       400:
 *         description: category 값 누락 또는 잘못된 요청
 */
router.get("/category", checkCategoricalShow);


/**
 * @swagger
 * /shows/operations/recommended:
 *   get:
 *     summary: 추천 공연 조회
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: 추천 공연 리스트 반환
 */
router.get("/operations/recommended", showRecommendShow);


/**
 * @swagger
 * /shows/search:
 *   get:
 *     summary: 공연 검색
 *     tags: [Shows]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: "검색 키워드"
 *     responses:
 *       200:
 *         description: "키워드와 일치하는 공연 리스트 반환"
 *       400:
 *         description: "검색 키워드 누락"
 */
router.get("/search", searchShow);

export default router;
